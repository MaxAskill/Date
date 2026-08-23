import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service role key.
 * IMPORTANT: This file must only be imported in API routes or
 * server components — never imported into client components.
 */
let _admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (_admin) return _admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  _admin = createClient(url, key, {
    auth: { persistSession: false },
  });
  return _admin;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

/**
 * SQL schema to run in the Supabase SQL editor:
 *
 * create table if not exists date_responses (
 *   id uuid primary key default gen_random_uuid(),
 *   invite_slug text not null,
 *   status text not null default 'undecided',
 *   selected_date text,
 *   selected_time text,
 *   selected_restaurant_id text,
 *   selected_restaurant_name text,
 *   custom_restaurant text,
 *   selected_activity text,
 *   custom_activity text,
 *   personal_message text,
 *   created_at timestamptz not null default now()
 * );
 * create index if not exists date_responses_slug_idx
 *   on date_responses(invite_slug, created_at desc);
 */
export const SUPABASE_SCHEMA_SQL = `-- Run in Supabase SQL editor
create table if not exists date_responses (
  id uuid primary key default gen_random_uuid(),
  invite_slug text not null,
  status text not null default 'undecided',
  selected_date text,
  selected_time text,
  selected_restaurant_id text,
  selected_restaurant_name text,
  custom_restaurant text,
  selected_activity text,
  custom_activity text,
  personal_message text,
  created_at timestamptz not null default now()
);
create index if not exists date_responses_slug_idx
  on date_responses(invite_slug, created_at desc);
`;
