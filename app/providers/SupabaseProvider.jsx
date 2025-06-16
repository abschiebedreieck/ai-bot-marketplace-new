'use client'

import { createContext, useContext, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

const Context = createContext(null)

export const SupabaseProvider = ({ children }) => {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  )
  return <Context.Provider value={supabase}>{children}</Context.Provider>
}

export const useSupabase = () => useContext(Context)
  