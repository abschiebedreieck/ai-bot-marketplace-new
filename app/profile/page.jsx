"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProfilePage() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase.from('purchases').select('*').eq('user_id', user.id);
      if (!error) setPurchases(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Meine Käufe</h1>
      <div className="grid grid-cols-1 gap-4">
        {purchases.map(purchase => (
          <div key={purchase.id} className="bg-white text-black p-4 rounded shadow">
            <p>Purchase ID: {purchase.id}</p>
            <p>Bot ID: {purchase.bot_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
