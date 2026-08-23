import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

type IncomingPayload = {
  invite_slug?: string;
  status?: "accepted" | "undecided" | "declined";
  selected_date?: string | null;
  selected_time?: string | null;
  selected_time_label?: string | null;
  selected_restaurant_id?: string | null;
  selected_restaurant_name?: string | null;
  custom_restaurant?: string | null;
  selected_activity?: string | null;
  custom_activity?: string | null;
  personal_message?: string | null;
};

export async function POST(req: NextRequest) {
  let body: IncomingPayload;
  try {
    body = (await req.json()) as IncomingPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const inviteSlug = (body.invite_slug || "").toString().trim();
  if (!inviteSlug) {
    return NextResponse.json(
      { error: "Missing invite_slug" },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const personalMessage = (body.personal_message ?? "").toString().slice(0, 500);

  if (!isSupabaseConfigured()) {
    // In dev without Supabase, log and succeed so the UX still works.
    // The creator dashboard will show a "no responses yet" state.
    console.info("[date-invitation] Supabase not configured. Response:", {
      invite_slug: inviteSlug,
      ...body,
    });
    return NextResponse.json(
      { ok: true, stored: false },
      { headers: noStoreHeaders },
    );
  }

  const admin = getSupabaseAdmin()!;
  const { error } = await admin.from("date_responses").insert({
    invite_slug: inviteSlug,
    status: body.status ?? "accepted",
    selected_date: body.selected_date ?? null,
    selected_time: body.selected_time_label ?? body.selected_time ?? null,
    selected_restaurant_id: body.selected_restaurant_id ?? null,
    selected_restaurant_name: body.selected_restaurant_name ?? null,
    custom_restaurant: body.custom_restaurant ?? null,
    selected_activity: body.selected_activity ?? null,
    custom_activity: body.custom_activity ?? null,
    personal_message: personalMessage || null,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not save response", detail: error.message },
      { status: 500, headers: noStoreHeaders },
    );
  }

  return NextResponse.json(
    { ok: true, stored: true },
    { headers: noStoreHeaders },
  );
}

export async function DELETE(req: NextRequest) {
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

  let body: { id?: string };
  try {
    body = (await req.json()) as { id?: string };
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const id = (body.id || "").toString().trim();
  if (!id) {
    return NextResponse.json(
      { error: "Missing response id" },
      { status: 400, headers: noStoreHeaders },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: true, deleted: false, configured: false },
      { headers: noStoreHeaders },
    );
  }

  const admin = getSupabaseAdmin()!;
  const { error } = await admin.from("date_responses").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Could not delete response", detail: error.message },
      { status: 500, headers: noStoreHeaders },
    );
  }

  return NextResponse.json(
    { ok: true, deleted: true },
    { headers: noStoreHeaders },
  );
}
