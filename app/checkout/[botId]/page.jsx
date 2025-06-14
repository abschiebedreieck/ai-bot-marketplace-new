"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CheckoutPage() {
  const paypalRef = useRef();
  const { botId } = useParams();
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBot() {
      const { data, error } = await supabase
        .from('bots')
        .select('*')
        .eq('id', botId)
        .single();

      if (data) {
        setPrice(data.price);
      }
      setLoading(false);
    }
    fetchBot();
  }, [botId]);

  useEffect(() => {
    if (!loading && price) {
      if (!window.paypal) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR`;
        script.addEventListener("load", () => renderPayPalButtons());
        document.body.appendChild(script);
      } else {
        renderPayPalButtons();
      }
    }
  }, [loading, price]);

  const renderPayPalButtons = () => {
    window.paypal.Buttons({
      createOrder: async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price }),
        });
        const data = await res.json();
        return data.id;
      },
      onApprove: async (data, actions) => {
        alert("✅ Zahlung erfolgreich für Bot-ID: " + botId);
        // Hier später die Freischaltung in der Datenbank machen
      },
      onError: (err) => {
        console.error(err);
      }
    }).render(paypalRef.current);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Bezahlen für Bot {botId}</h1>
      <div ref={paypalRef}></div>
    </div>
  );
}
