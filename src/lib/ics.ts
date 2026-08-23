import type { DatePlan } from "./types";

const CALENDAR_GUEST_EMAIL = "perezmelvin74@gmail.com";

/**
 * Build a Google Calendar "add event" URL for a date plan.
 */
export function buildGoogleCalendarUrl(plan: DatePlan): string {
  if (!plan.date || !plan.time) return "";
  const start = combineDateTime(plan.date.date, plan.time.value);
  // Default to a 2-hour event
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const restaurant =
    plan.restaurant?.name || plan.customRestaurant || "Our date";
  const invitee = plan.inviteeName ? ` with ${plan.inviteeName}` : "";
  const activity = plan.activity?.label || plan.customActivity || "";
  const activityLine = activity && activity !== "Let's decide later"
    ? `After: ${activity}`
    : "";

  const details = [
    `Our date 💕`,
    activityLine,
    "",
    `Look forward to seeing you.`,
  ]
    .filter(Boolean)
    .join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Date${invitee} 💕 — ${restaurant}`,
    dates: `${formatGCal(start)}/${formatGCal(end)}`,
    details,
    location: plan.restaurant?.location || "Ortigas, Metro Manila",
    add: CALENDAR_GUEST_EMAIL,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function combineDateTime(dateIso: string, timeValue: string): Date {
  const [y, m, d] = dateIso.split("-").map(Number);
  const [hh, mm] = timeValue.split(":").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 18, mm ?? 0, 0);
}

function formatGCal(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  );
}

/**
 * Build an .ics file contents string for the date plan.
 */
export function buildIcsFile(plan: DatePlan): string {
  if (!plan.date || !plan.time) return "";
  const start = combineDateTime(plan.date.date, plan.time.value);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const restaurant =
    plan.restaurant?.name || plan.customRestaurant || "Our date";
  const invitee = plan.inviteeName ? ` with ${plan.inviteeName}` : "";
  const activity = plan.activity?.label || plan.customActivity || "";
  const description = [
    "Our date 💕",
    activity && activity !== "Let's decide later" ? `After: ${activity}` : "",
    "",
    "Looking forward to seeing you.",
  ]
    .filter(Boolean)
    .join("\\n");

  const location = plan.restaurant?.location || "Ortigas, Metro Manila";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Date Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-date-invitation@local`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:Date${invitee} 💕 — ${escapeIcs(restaurant)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(location)}`,
    `ATTENDEE;CN=Melvin Perez;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${CALENDAR_GUEST_EMAIL}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return ics;
}

function formatIcsDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  );
}

function escapeIcs(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function downloadIcsFile(plan: DatePlan): void {
  const ics = buildIcsFile(plan);
  if (!ics) return;
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const filenameName = plan.inviteeName
    ? plan.inviteeName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "our";
  a.download = `${filenameName}-date.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
