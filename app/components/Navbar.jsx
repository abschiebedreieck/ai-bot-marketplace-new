'use client'

import Link from "next/link"
import { useSupabase } from '../providers/SupabaseProvider'
import { useEffect, useState } from "react"

export default function Navbar() {
  const supabase = useSupabase()
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  }, [supabase])

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center fixed w-full z-50 shadow-md">
      <Link href="/" className="text-2xl font-bold">AI Bot Marketplace</Link>

      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Bots durchsuchen..."
          className="w-96 bg-gray-800 border border-gray-600 rounded px-4 py-2"
        />
      </div>

      <div className="flex space-x-6 items-center">
        <Link href="/marketplace" className="hover:text-gray-400">Marketplace</Link>
        {session?.user ? (
          <>
            <Link href="/dashboard" className="hover:text-gray-400">Dashboard</Link>
            <button onClick={() => supabase.auth.signOut()} className="hover:text-gray-400">Logout</button>
          </>
        ) : (
          <Link href="/login" className="hover:text-gray-400">Login</Link>
        )}
      </div>
    </nav>
  )
}
