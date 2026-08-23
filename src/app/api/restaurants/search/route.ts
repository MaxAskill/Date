import { NextRequest, NextResponse } from "next/server";
import { getRestaurants } from "@/lib/restaurants";

export const dynamic = "force-dynamic";

/**
 * Optional Google Places integration. If GOOGLE_PLACES_API_KEY is set,
 * this proxy searches for restaurants near Ortigas and returns normalized
 * results. If no key is configured, it falls back to the curated list
 * from src/lib/restaurants.ts.
 *
 * To enable, set GOOGLE_PLACES_API_KEY in your .env.local.
 */
export async function GET(req: NextRequest) {
  const query = (req.nextUrl.searchParams.get("q") || "").trim();
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    // Fallback: filter the static list
    const all = getRestaurants();
    const filtered = query
      ? all.filter((r) => {
          const haystack =
            `${r.name} ${r.cuisine} ${r.location} ${r.description}`.toLowerCase();
          return haystack.includes(query.toLowerCase());
        })
      : all;
    return NextResponse.json({ source: "static", restaurants: filtered });
  }

  try {
    const textQuery = query
      ? `${query} restaurant near Ortigas Metro Manila`
      : "restaurant near Ortigas Metro Manila";

    const url =
      "https://places.googleapis.com/v1/places:searchText";

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.priceLevel,places.types,places.photos,places.editorialSummary",
      },
      body: JSON.stringify({
        textQuery,
        locationBias: {
          circle: {
            center: { latitude: 14.5866, longitude: 121.0617 }, // Ortigas Center
            radius: 4000,
          },
        },
        maxResultCount: 20,
      }),
      // Cache for 1 hour to be polite
      next: { revalidate: 3600 },
    });

    if (!resp.ok) {
      return NextResponse.json(
        { source: "error", error: `Places API ${resp.status}` },
        { status: 502 },
      );
    }

    const data = await resp.json();
    const restaurants = (data.places || [])
      .filter(
        (p: { priceLevel?: string }) =>
          p.priceLevel !== "PRICE_LEVEL_EXPENSIVE" &&
          p.priceLevel !== "PRICE_LEVEL_VERY_EXPENSIVE",
      )
      .map((p: {
        id: string;
        displayName?: { text?: string };
        formattedAddress?: string;
        rating?: number;
        priceLevel?: string;
        types?: string[];
        photos?: { name: string }[];
        editorialSummary?: { text?: string };
      }) => {
        const photoName = p.photos?.[0]?.name;
        const photoUrl = photoName
          ? `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&key=${apiKey}`
          : "";
        return {
          id: p.id,
          name: p.displayName?.text || "Restaurant",
          cuisine: (p.types?.[0] || "Restaurant")
            .toString()
            .replace(/_/g, " "),
          category: "Casual",
          priceRange: p.priceLevel === "PRICE_LEVEL_MODERATE" ? "₱₱" : "₱",
          location: p.formattedAddress || "",
          description: p.editorialSummary?.text || "",
          image: photoUrl,
          mapsUrl: `https://www.google.com/maps/place/?q=place_id:${p.id}`,
          distanceFromOrtigas: undefined,
          vibe: undefined,
        };
      });

    return NextResponse.json({ source: "google", restaurants });
  } catch (e) {
    return NextResponse.json(
      { source: "error", error: e instanceof Error ? e.message : "unknown" },
      { status: 500 },
    );
  }
}
