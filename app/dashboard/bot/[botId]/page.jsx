'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from '@/app/providers/SupabaseProvider'
import Reviews from '@/app/components/reviews/Reviews'
import AddReview from '@/app/components/reviews/AddReview'
import { useParams } from 'next/navigation'

export default function BotDetail() {
  const supabase = useSupabase()
  const [bot, setBot] = useState(null)
  const params = useParams()

  const botId = params.botId  // sauber extrahieren

  useEffect(() => {
    const fetchBot = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('bots')
        .select('*')
        .eq('id', botId)
        .eq('owner_id', user.id)
        .single()

      if (!error) setBot(data)
    }
    fetchBot()
  }, [botId, supabase])

  if (!bot) return <div>Loading...</div>

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">{bot.name}</h1>
      <p>{bot.description}</p>
      <p>Preis: {bot.price} €</p>
      <p>API URL: {bot.api_url}</p>

      <div className="mt-8">
        <Reviews bot_id={bot.id} />
        <AddReview bot_id={bot.id} />
      </div>
    </div>
  )
}
