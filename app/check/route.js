import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req) {
  const { user_id, bot_id } = await req.json();

  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', user_id)
    .eq('bot_id', bot_id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return NextResponse.json({ access: false, error: error.message }, { status: 500 });
  }

  if (data) {
    return NextResponse.json({ access: true });
  } else {
    return NextResponse.json({ access: false });
  }
}