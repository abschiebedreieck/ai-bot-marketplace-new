'use client'

import { useState, useEffect } from 'react'

export default function Reviews({ bot_id }) {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch('/api/reviews/get', {
      method: 'POST',
      body: JSON.stringify({ bot_id }),
    }).then(async (res) => {
      const data = await res.json()
      setReviews(data)
    })
  }, [bot_id])

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Bewertungen</h3>
      {reviews.map((review, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
          <div>Sterne: {review.rating} / 5</div>
          <div>{review.comment}</div>
          <div className="text-sm text-gray-500">{new Date(review.created_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}