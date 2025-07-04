"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminPage() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    async function fetchPurchases() {
      const { data, error } = await supabase.from('purchases').select('*');
      if (!error) setPurchases(data);
    }
    fetchPurchases();
  }, []);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <div className="grid grid-cols-1 gap-4">
        {purchases.map(purchase => (
          <div key={purchase.id} className="bg-white text-black p-4 rounded shadow">
            <p>Purchase ID: {purchase.id}</p>
            <p>User ID: {purchase.user_id}</p>
            <p>Bot ID: {purchase.bot_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
