"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Admin() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  async function fetchPurchases() {
    const { data, error } = await supabase
      .from('purchases')
      .select(`
        id,
        purchased_at,
        user_id,
        bot_id,
        bots(name, price)
      `)
      .order('purchased_at', { ascending: false });

    if (!error) {
      setPurchases(data);
    } else {
      console.error(error);
    }
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Admin Panel - Käufe</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Purchase ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Bot</th>
            <th className="border p-2">Preis</th>
            <th className="border p-2">Datum</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td className="border p-2">{purchase.id}</td>
              <td className="border p-2">{purchase.user_id}</td>
              <td className="border p-2">{purchase.bots?.name}</td>
              <td className="border p-2">{purchase.bots?.price} €</td>
              <td className="border p-2">{new Date(purchase.purchased_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
