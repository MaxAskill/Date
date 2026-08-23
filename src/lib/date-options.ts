import type { DateOption, TimeOption, ActivityOption } from "./types";

/**
 * Generate "this and next weekend" date suggestions relative to today.
 * We avoid manipulating the system date — we just read it and compute
 * the next two Friday/Saturday/Sunday blocks.
 */
export function getSuggestedDates(today: Date = new Date()): DateOption[] {
  const result: DateOption[] = [];
  const base = new Date(today);
  base.setHours(0, 0, 0, 0);

  // Look for the next 3 upcoming weekend days (Fri/Sat/Sun) within ~14 days
  let checked = 0;
  let cursor = new Date(base);
  cursor.setDate(cursor.getDate() + 1); // start from tomorrow

  const labelsByDow: Record<number, [string, string]> = {
    5: ["Friday night", "evening"],
    6: ["Saturday afternoon", "afternoon"],
    0: ["Sunday afternoon", "afternoon"],
  };

  while (result.length < 4 && checked < 21) {
    const dow = cursor.getDay();
    if (dow === 5 || dow === 6 || dow === 0) {
      const [label, _helper] = labelsByDow[dow];
      const iso = cursor.toISOString().slice(0, 10);
      const helper = cursor.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      result.push({
        id: `suggested-${iso}`,
        label,
        date: iso,
        helper,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
    checked += 1;
  }

  return result;
}

export const timeOptions: TimeOption[] = [
  { id: "t-16", label: "4:00 PM", value: "16:00" },
  { id: "t-17", label: "5:00 PM", value: "17:00" },
  { id: "t-18", label: "6:00 PM", value: "18:00" },
  { id: "t-19", label: "7:00 PM", value: "19:00" },
  { id: "t-20", label: "8:00 PM", value: "20:00" },
];

export const activityOptions: ActivityOption[] = [
  { id: "coffee", label: "Coffee", emoji: "☕", description: "A quiet, easy way to keep talking." },
  { id: "dessert", label: "Dessert", emoji: "🍰", description: "Something sweet to share." },
  { id: "movie", label: "Movie", emoji: "🎬", description: "Catch a film at the mall." },
  { id: "bowling", label: "Bowling", emoji: "🎳", description: "Playful and a little competitive." },
  { id: "arcade", label: "Arcade", emoji: "🎮", description: "Just-for-fun games." },
  { id: "walk", label: "Night walk", emoji: "🌃", description: "Take it slow and just walk around." },
  { id: "drinks", label: "Drinks", emoji: "🍸", description: "A cocktail and easy conversation." },
  { id: "capitol-commons", label: "Capitol Commons", emoji: "🌙", description: "Walk, talk, then decide what feels right." },
  { id: "podium-dessert", label: "Podium dessert", emoji: "🍮", description: "A sweet stop nearby after dinner." },
  { id: "estancia-coffee", label: "Estancia coffee", emoji: "🤍", description: "Keep it calm and close around Capitol Commons." },
  { id: "greenfield-walk", label: "Greenfield stroll", emoji: "✨", description: "An easy open-air walk if the weather is nice." },
  {
    id: "airbnb-ortigas",
    label: "Ortigas staycation",
    emoji: "🏙️",
    description: "Browse weekend Airbnb stays around Ortigas if she wants a slow, cozy plan.",
    href: "https://www.airbnb.com/ortigas-center-pasig-philippines/stays",
  },
  {
    id: "airbnb-megamall",
    label: "Near Megamall stay",
    emoji: "🛏️",
    description: "Look for a stay near SM Megamall so food, coffee, and movies are close.",
    href: "https://www.airbnb.com/sm-megamall-mandaluyong-city-philippines/stays",
  },
  {
    id: "airbnb-estancia",
    label: "Estancia weekend",
    emoji: "🌆",
    description: "Check Airbnb stays around Estancia or Capitol Commons for a softer weekend option.",
    href: "https://www.airbnb.com/estancia-pasig-philippines/stays",
  },
  {
    id: "outside-date",
    label: "Just outside",
    emoji: "🌿",
    description: "No staycation needed. We can keep it simple with dinner, coffee, and a walk.",
  },
  { id: "you-choose", label: "You choose", emoji: "💭", description: "Tell me what would make you most comfortable." },
  {
    id: "later",
    label: "Let's decide later",
    emoji: "💕",
    description: "No pressure — we can play it by ear.",
  },
];
