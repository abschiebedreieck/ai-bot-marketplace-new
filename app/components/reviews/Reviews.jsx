'use client'

import { useEffect, useState } from 'react'

export default function Reviews({ bot_id }) {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    async function loadReviews() {
      const res = await fetch('/api/reviews/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bot_id }),
      })
      const data = await res.json()
      setReviews(data)
    }
    loadReviews()
  }, [bot_id])

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Bewertungen</h2>
      {reviews.length === 0 && <p>Keine Bewertungen vorhanden.</p>}
      {reviews.map((r, idx) => (
        <div key={idx} className="border p-2 mb-2">
          <p>Bewertung: {r.rating} Sterne</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  )
}
