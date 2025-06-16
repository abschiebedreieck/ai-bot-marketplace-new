'use client'

import { useState } from 'react'
import { useSupabase } from '@/app/providers/SupabaseProvider'

export default function AddReview({ bot_id }) {
  const supabase = useSupabase()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const submit = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    const res = await fetch('/api/reviews/add', {
      method: 'POST',
      body: JSON.stringify({
        bot_id,
        user_id: user.id,
        rating,
        comment,
      }),
    })

    if (res.status === 200) {
      setMessage('Danke für deine Bewertung!')
    } else {
      const err = await res.json()
      setMessage(err.error)
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Bewertung abgeben</h3>
      <div className="mb-4">
        <label>Sterne (1-5):</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" className="ml-2 w-16" />
      </div>
      <textarea placeholder="Kommentar" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 border rounded mb-4" />
      <button onClick={submit} className="bg-blue-500 p-2 text-white rounded">Absenden</button>
      {message && <div className="mt-4">{message}</div>}
    </div>
  )
}