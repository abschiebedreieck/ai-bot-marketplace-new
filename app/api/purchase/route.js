export const runtime = "nodejs";           // bleibt ganz oben

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// KEIN NEXT_PUBLIC_ Präfix in Server-Code
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const { user_id, bot_id } = await req.json();

  const { data, error } = await supabase
    .from("purchases")
    .insert({ user_id, bot_id });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}
