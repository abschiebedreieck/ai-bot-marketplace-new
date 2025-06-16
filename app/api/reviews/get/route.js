import { supabase } from "lib/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { bot_id } = body;

  const { data, error } = await supabase
    .from("reviews")
    .select("rating, comment, created_at")
    .eq("bot_id", bot_id)
    .order("created_at", { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
