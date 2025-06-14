"use client";

import React, { useEffect, useRef } from 'react';

export default function CheckoutPage() {
  const paypalRef = useRef();

  useEffect(() => {
    const loadPayPalScript = () => {
      const existingScript = document.getElementById('paypal-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR`;
        script.id = 'paypal-script';
        script.addEventListener('load', renderPayPalButtons);
        document.body.appendChild(script);
      } else {
        renderPayPalButtons();
      }
    };

    const renderPayPalButtons = () => {
      window.paypal.Buttons({
        createOrder: async () => {
          const res = await fetch("/api/paypal/create-order", { method: "POST" });
          const data = await res.json();
          return data.id;
        },
        onApprove: async (data, actions) => {
          alert("✅ Zahlung erfolgreich: " + data.orderID);

          // Beispiel User- und Bot-ID (später dynamisch ersetzen)
          const user_id = "DEIN_SUPABASE_USER_ID";   // HIER später Supabase User ID holen
          const bot_id = "DEIN_BOT_ID";              // Bot-ID, den der Kunde gekauft hat

          // API Call an unser Purchase System
          await fetch('/api/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, bot_id }),
          });
        },
        onError: (err) => {
          console.error("PayPal Error:", err);
        }
      }).render(paypalRef.current);
    };

    loadPayPalScript();
  }, []);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Bezahlen mit PayPal</h1>
      <div ref={paypalRef}></div>
    </div>
  );
}
