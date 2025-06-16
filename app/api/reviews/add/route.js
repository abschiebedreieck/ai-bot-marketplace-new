import { supabase } from "lib/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { bot_id, user_id, rating, comment } = body;

  const { data: purchase, error: purchaseError } = await supabase
    .from("purchases")
    .select("*")
    .eq("bot_id", bot_id)
    .eq("user_id", user_id)
    .single();

  if (!purchase || purchaseError) {
    return new Response(JSON.stringify({ error: "Kein Kauf gefunden" }), { status: 403 });
  }

  const { data: existing } = await supabase
    .from("reviews")
    .select("*")
    .eq("bot_id", bot_id)
    .eq("user_id", user_id)
    .single();

  if (existing) {
    return new Response(JSON.stringify({ error: "Schon bewertet" }), { status: 409 });
  }

  const { error } = await supabase
    .from("reviews")
    .insert([{ bot_id, user_id, rating, comment }]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
