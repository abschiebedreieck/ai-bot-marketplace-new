"use client";

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CheckoutPage() {
  const { botId } = useParams();
  const paypalRef = useRef();
  const [bot, setBot] = useState(null);

  useEffect(() => {
    async function fetchBot() {
      const { data, error } = await supabase.from('bots').select('*').eq('id', botId).single();
      if (!error) setBot(data);
    }
    fetchBot();
  }, [botId]);

  useEffect(() => {
    if (bot && !window.paypal) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR`;
      script.addEventListener("load", () => renderPayPalButtons());
      document.body.appendChild(script);
    } else if (bot) {
      renderPayPalButtons();
    }
  }, [bot]);

  const renderPayPalButtons = () => {
    window.paypal.Buttons({
      createOrder: async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: bot.price }),
        });
        const data = await res.json();
        return data.id;
      },
      onApprove: async (data, actions) => {
        alert("✅ Zahlung erfolgreich: " + data.orderID);
      },
      onError: (err) => {
        console.error(err);
      }
    }).render(paypalRef.current);
  };

  if (!bot) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Bezahlen: {bot.name}</h1>
      <div className="mb-4">Preis: {bot.price} €</div>
      <div ref={paypalRef}></div>
    </div>
  );
}