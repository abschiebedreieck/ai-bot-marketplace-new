export const runtime  = "nodejs";
export const dynamic  = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient }  from "@supabase/supabase-js";

export async function POST(req) {
  const { user_id, bot_id } = await req.json();

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Beispiel: prüfen, ob der Nutzer den Bot gekauft hat
  const { count, error } = await supabase
    .from("purchases")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user_id)
    .eq("bot_id", bot_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ access: count > 0 });
}
