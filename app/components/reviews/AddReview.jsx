"use client";

import { useState, useEffect } from "react";
import { useSupabase } from "app/providers/SupabaseProvider";

export default function AddReview({ bot_id }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);
  const supabase = useSupabase();

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    }
    fetchUser();
  }, [supabase]);

  async function submitReview() {
    const res = await fetch("/api/reviews/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bot_id, user_id: userId, rating, comment }),
    });
    const data = await res.json();
    alert(data.error || "Bewertung gespeichert!");
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Eigene Bewertung abgeben:</h3>
      <input
        type="number"
        min={1}
        max={5}
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="text-black"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="block w-full text-black"
      />
      <button onClick={submitReview} className="bg-blue-500 p-2 mt-2">
        Absenden
      </button>
    </div>
  );
}
