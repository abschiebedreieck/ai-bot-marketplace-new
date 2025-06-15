export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient }  from "@supabase/supabase-js";

// KEIN createClient HIER!

export async function POST(req) {
  // createClient erst hier
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
