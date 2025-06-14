import { NextResponse } from 'next/server';

export async function POST(req) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;

  const { price } = await req.json(); // Preis kommt jetzt aus dem Frontend

  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');

  const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const { access_token } = await response.json();

  const orderResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: price.toFixed(2),  // Preis wird dynamisch gesetzt
          },
        },
      ],
    }),
  });

  const orderData = await orderResponse.json();

  return NextResponse.json(orderData);
}
