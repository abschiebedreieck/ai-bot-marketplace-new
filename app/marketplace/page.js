"use client";

import React, { useEffect, useRef } from 'react';

export default function CheckoutPage() {
  const paypalRef = useRef();

  const botPrice = 12.99;  // Beispiel: dynamischer Preis kommt hier vom Bot

  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR`;
      script.addEventListener("load", () => renderPayPalButtons());
      document.body.appendChild(script);
    } else {
      renderPayPalButtons();
    }
  }, []);

  const renderPayPalButtons = () => {
    window.paypal.Buttons({
      createOrder: async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: botPrice }),
        });
        const data = await res.json();
        return data.id;
      },
      onApprove: async (data) => {
        alert("✅ Zahlung erfolgreich: " + data.orderID);
      },
      onError: (err) => {
        console.error(err);
      }
    }).render(paypalRef.current);
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Bezahlen mit PayPal</h1>
      <div ref={paypalRef}></div>
    </div>
  );
}
