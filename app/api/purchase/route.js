export const runtime  = "nodejs";          // zwingt Node-Runtime
export const dynamic  = "force-dynamic";   // verhindert Build-Analyse

import { NextResponse } from "next/server";
import { createClient }  from "@supabase/supabase-js";

export async function POST(req) {
  // Supabase-Client wird erst hier erzeugt:
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { user_id, bot_id } = await req.json();

  const { data, error } = await supabase
    .from("purchases")
    .insert({ user_id, bot_id });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}
