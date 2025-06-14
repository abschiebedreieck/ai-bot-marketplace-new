"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

// ✅ Sub-Komponente für Access Check
function BotAccess({ user_id, bot_id }) {
  const [access, setAccess] = useState(null);

  useEffect(() => {
    async function checkAccess() {
      const res = await fetch('/api/purchases/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, bot_id }),
      });

      const result = await res.json();
      setAccess(result.access);
    }

    checkAccess();
  }, [user_id, bot_id]);

  if (access === null) return <div>Loading...</div>;

  return (
    <div>
      {access ? (
        <div>Zugriff erlaubt ✅</div>
      ) : (
        <div>Zugriff verweigert ❌ – bitte erst kaufen!</div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [bots, setBots] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [editingBot, setEditingBot] = useState(null);
  const [user_id, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchBots(user.id);
      }
    }
    loadUser();
  }, []);

  async function fetchBots(userId) {
    const { data, error } = await supabase.from('bots').select('*').eq('owner_id', userId);
    if (!error) setBots(data);
  }

  async function handleSave() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (editingBot) {
      const { error } = await supabase.from('bots').update({
        name, description, price, api_url: apiUrl
      }).eq('id', editingBot.id).eq('owner_id', user.id);

      if (!error) {
        setEditingBot(null);
        resetForm();
        fetchBots(user.id);
      }
    } else {
      const { error } = await supabase.from('bots').insert({
        owner_id: user.id,
        name, description, price, api_url: apiUrl
      });

      if (!error) {
        resetForm();
        fetchBots(user.id);
      }
    }
  }

  async function handleDelete(id) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('bots').delete().eq('id', id).eq('owner_id', user.id);
    fetchBots(user.id);
  }

  function handleEdit(bot) {
    setEditingBot(bot);
    setName(bot.name);
    setDescription(bot.description);
    setPrice(bot.price);
    setApiUrl(bot.api_url);
  }

  function resetForm() {
    setName('');
    setDescription('');
    setPrice('');
    setApiUrl('');
    setEditingBot(null);
  }

  function handleBuy(bot) {
    router.push(`/checkout/${bot.id}`);
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Developer Dashboard</h1>

      <div className="mb-8">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="block mb-2 w-full bg-black border-white border p-2" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beschreibung" className="block mb-2 w-full bg-black border-white border p-2" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preis (€)" className="block mb-2 w-full bg-black border-white border p-2" />
        <input value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} placeholder="API URL" className="block mb-2 w-full bg-black border-white border p-2" />
        <button onClick={handleSave} className="bg-blue-500 p-2 rounded">{editingBot ? 'Update' : 'Speichern'}</button>
      </div>

      <h2 className="text-xl mb-4">Meine Bots</h2>
      <div className="grid grid-cols-1 gap-4">
        {bots.map(bot => (
          <div key={bot.id} className="bg-white text-black p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">{bot.name}</h3>
              <p>{bot.description}</p>
              <p className="font-semibold">{bot.price} € / Monat</p>
              <p className="text-sm text-gray-500">{bot.api_url}</p>

              {/* Access Check einbauen */}
              {user_id && <BotAccess user_id={user_id} bot_id={bot.id} />}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(bot)} className="bg-yellow-400 p-1 rounded">Edit</button>
              <button onClick={() => handleDelete(bot.id)} className="bg-red-500 p-1 rounded text-white">Delete</button>
              <button onClick={() => handleBuy(bot)} className="bg-green-500 p-1 rounded text-white">Kaufen</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
