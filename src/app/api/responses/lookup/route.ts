import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

/**
 * Lookup the latest response for a given invite slug. Requires the
 * dashboard password via the X-Dashboard-Password header. This is a
 * simple shared-secret gate — fine for a personal invitation, but
 * replace with proper auth for any wider use.
 */
export async function GET(req: NextRequest) {
  const password = req.headers.get("x-dashboard-password") || "";
  const expected = process.env.DASHBOARD_PASSWORD || "";

  if (!expected) {
    return NextResponse.json(
      { error: "DASHBOARD_PASSWORD is not configured on the server." },
      { status: 500, headers: noStoreHeaders },
    );
  }
  if (password !== expected) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: noStoreHeaders },
    );
  }

  const slug = req.nextUrl.searchParams.get("slug") || "";
  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug" },
      { status: 400, headers: noStoreHeaders },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      configured: false,
      responses: [],
    }, { headers: noStoreHeaders });
  }

  const admin = getSupabaseAdmin()!;
  const { data, error } = await admin
    .from("date_responses")
    .select("*")
    .eq("invite_slug", slug)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json(
      { error: "Could not load responses", detail: error.message },
      { status: 500, headers: noStoreHeaders },
    );
  }

  return NextResponse.json(
    { ok: true, configured: true, responses: data },
    { headers: noStoreHeaders },
  );
}
