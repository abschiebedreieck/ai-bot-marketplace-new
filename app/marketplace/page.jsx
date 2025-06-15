"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function MarketplacePage() {
  const [bots, setBots] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchBots() {
      const { data, error } = await supabase.from('bots').select('*');
      if (!error) setBots(data);
    }
    fetchBots();
  }, []);

  function handleBuy(botId) {
    router.push(`/checkout/${botId}`);
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
      <div className="grid grid-cols-1 gap-4">
        {bots.map(bot => (
          <div key={bot.id} className="bg-white text-black p-4 rounded shadow">
            <h3 className="font-bold">{bot.name}</h3>
            <p>{bot.description}</p>
            <p className="font-semibold">{bot.price} € / Monat</p>
            <button 
              onClick={() => handleBuy(bot.id)}
              className="mt-2 bg-green-500 p-2 rounded text-white"
            >
              Kaufen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
