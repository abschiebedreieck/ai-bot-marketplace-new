'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '../providers/SupabaseProvider'

export default function LoginPage() {
  const supabase = useSupabase()
  const [email, setEmail] = useState('')
  const [session, setSession] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  }, [supabase])

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Magic Link gesendet! Check dein Postfach.')
    }
  }

  if (session?.user) {
    return <p>Du bist eingeloggt als {session.user.email}</p>
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block mb-4 w-96 bg-black border-white border p-2 text-white"
      />
      <button onClick={handleLogin} className="bg-blue-500 p-2 rounded w-96">
        Magic Link senden
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}
