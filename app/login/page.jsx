"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage("Fehler beim Login");
    } else {
      setMessage("Check dein E-Mail Postfach für den Login-Link");
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push("/dashboard");
    });
  }, []);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          className="p-2 rounded w-full text-black" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        <button className="bg-blue-500 p-2 rounded w-full" type="submit">Login Link senden</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
