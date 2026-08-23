import type { Restaurant } from "./types";

/**
 * Curated restaurant list around Ortigas / Metro Manila.
 * Photos are sourced from Unsplash (royalty-free). If a Google Places API key
 * is set at runtime, the API route in /api/restaurants/search will replace
 * this static data with live results.
 */
export const restaurants: Restaurant[] = [
  {
    id: "ippudo-megamall",
    name: "Ippudo",
    cuisine: "Japanese",
    category: "Japanese",
    priceRange: "₱₱",
    location: "SM Mega Fashion Hall, Mandaluyong",
    description:
      "Warm ramen bowls and easy Japanese comfort food. A safe, cozy pick if she wants something familiar and filling.",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Ippudo+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Ramen • Cozy",
  },
  {
    id: "ooma-megamall",
    name: "Ooma",
    cuisine: "Japanese",
    category: "Japanese",
    priceRange: "₱₱",
    location: "SM Mega Fashion Hall, Mandaluyong",
    description:
      "Modern Japanese plates, maki, and small dishes that are nice to share without making the date feel too formal.",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Ooma+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Shareable • Fun",
  },
  {
    id: "yakiniku-like-megamall",
    name: "Yakiniku Like",
    cuisine: "Japanese BBQ",
    category: "Japanese",
    priceRange: "₱",
    location: "SM Megamall Building A, Mandaluyong",
    description:
      "Value-for-money grilled meat sets, with budget-friendly meals that can stay comfortably below ₱1,000 per person.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Yakiniku+Like+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Budget • Interactive",
  },
  {
    id: "soban-megamall",
    name: "Soban K-Style BBQ",
    cuisine: "Korean",
    category: "Korean",
    priceRange: "₱₱",
    location: "SM Megamall Building B / Bridgeway, Mandaluyong",
    description:
      "Korean BBQ and Korean-Mexican dishes with a lively table setup. Good if she wants something playful and casual.",
    image:
      "https://images.unsplash.com/photo-1632789395770-20e6f63be806?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Soban+K-Town+Grill+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Lively • Interactive",
  },
  {
    id: "tim-ho-wan-megamall",
    name: "Tim Ho Wan",
    cuisine: "Dim sum",
    category: "Casual",
    priceRange: "₱₱",
    location: "SM Mega Fashion Hall, Mandaluyong",
    description:
      "Dim sum, rice meals, and Chinese comfort food. Nice for sharing a few plates and keeping the bill reasonable.",
    image:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Tim+Ho+Wan+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Dim sum • Shareable",
  },
  {
    id: "abe-megamall",
    name: "Abe",
    cuisine: "Filipino",
    category: "Casual",
    priceRange: "₱₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "Comforting Filipino dishes in a calmer sit-down setting. Great if she wants something familiar and easy to enjoy.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Abe+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Filipino • Comfort",
  },
  {
    id: "manam-megamall",
    name: "Manam Comfort Filipino",
    cuisine: "Filipino",
    category: "Casual",
    priceRange: "₱₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "Modern Filipino comfort food with plenty of shareable dishes. Good for a relaxed dinner that still feels thoughtful.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Manam+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Comfort • Shareable",
  },
  {
    id: "mesa-megamall",
    name: "Mesa",
    cuisine: "Filipino",
    category: "Casual",
    priceRange: "₱₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "Filipino classics and grilled dishes in a casual setting. A comfortable choice if she wants something hearty.",
    image:
      "https://images.unsplash.com/photo-1533777324565-a040eb52fac1?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Mesa+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Filipino • Casual",
  },
  {
    id: "gerrys-grill-megamall",
    name: "Gerry's Grill",
    cuisine: "Filipino",
    category: "Casual",
    priceRange: "₱₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "Classic Filipino grilled dishes and rice meals. Familiar, affordable, and easy to order without overthinking.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Gerry's+Grill+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Familiar • Affordable",
  },
  {
    id: "botejyu-megamall",
    name: "Botejyu",
    cuisine: "Japanese",
    category: "Japanese",
    priceRange: "₱₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "Japanese comfort food with okonomiyaki, ramen, takoyaki, and rice bowls. Easy to keep casual and filling.",
    image:
      "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Botejyu+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Japanese • Casual",
  },
  {
    id: "8cuts-megamall",
    name: "8Cuts Burger Blends",
    cuisine: "Burgers",
    category: "Casual",
    priceRange: "₱₱",
    location: "SM Mega Fashion Hall, Mandaluyong",
    description:
      "Burgers, fries, and milkshakes for an easy comfort-food date that feels casual instead of expensive.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=8Cuts+Burger+Blends+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Comfort food • Easy",
  },
  {
    id: "megafashion-food-hall",
    name: "Mega Food Hall",
    cuisine: "Open choice",
    category: "Casual",
    priceRange: "₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "A flexible food-hall option if she wants to browse first, keep the budget light, and pick whatever looks good.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=SM+Megamall+Mega+Food+Hall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Flexible • Budget",
  },
  {
    id: "pepper-lunch-megamall",
    name: "Pepper Lunch",
    cuisine: "Japanese sizzling plates",
    category: "Japanese",
    priceRange: "₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "Sizzling rice plates and quick Japanese-style meals. Casual, filling, and usually easy to keep under budget.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Pepper+Lunch+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Quick • Budget",
  },
  {
    id: "mr-kimbob-megamall",
    name: "Mr. Kimbob",
    cuisine: "Korean casual",
    category: "Korean",
    priceRange: "₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "Bibimbap, kimbap, and Korean rice bowls for a lighter, practical option if she wants something simple.",
    image:
      "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Mr+Kimbob+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Korean • Casual",
  },
  {
    id: "happy-roasts-megamall",
    name: "Happy Roasts PH",
    cuisine: "Roast meals",
    category: "Casual",
    priceRange: "₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "Straightforward roast meals if she wants something filling without turning dinner into a big spend.",
    image:
      "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Happy+Roasts+PH+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Simple • Filling",
  },
  {
    id: "los-churreros-megamall",
    name: "Los Churreros",
    cuisine: "Dessert / Coffee",
    category: "Dessert",
    priceRange: "₱",
    location: "SM Megamall, Mandaluyong",
    description:
      "A sweet, low-commitment dessert stop if dinner feels too much or she just wants coffee and something warm.",
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Los+Churreros+SM+Megamall",
    distanceFromOrtigas: "5 min walk",
    vibe: "Dessert • Low-pressure",
  },
  {
    id: "podium-you-pick",
    name: "You pick at The Podium",
    cuisine: "Open choice",
    category: "Casual",
    priceRange: "₱₱",
    location: "The Podium, Ortigas Center",
    description:
      "We can walk around first and choose whatever feels good in the moment. Easy, flexible, and close by.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=The+Podium+Ortigas+Center",
    distanceFromOrtigas: "3 min walk",
    vibe: "Flexible • Close",
  },
  {
    id: "estancia-open-choice",
    name: "Estancia open choice",
    cuisine: "Dinner / Coffee / Dessert",
    category: "Casual",
    priceRange: "₱₱",
    location: "Estancia, Capitol Commons, Pasig",
    description:
      "A low-pressure option: browse Estancia together, then settle on dinner, coffee, or dessert when we get there.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Estancia+Capitol+Commons+Pasig",
    distanceFromOrtigas: "Walking distance",
    vibe: "Relaxed • Walkable",
  },
  {
    id: "capitol-commons-stroll",
    name: "Capitol Commons stroll first",
    cuisine: "Open plan",
    category: "Cafe",
    priceRange: "₱₱",
    location: "Capitol Commons, Pasig",
    description:
      "Start with a short walk, then choose a cafe or restaurant nearby depending on what you are craving.",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Capitol+Commons+Pasig",
    distanceFromOrtigas: "Walking distance",
    vibe: "Soft • Easygoing",
  },
  {
    id: "megamall-comfort-pick",
    name: "Comfort pick at SM Megamall",
    cuisine: "Anything you like",
    category: "Casual",
    priceRange: "₱₱",
    location: "SM Megamall, Ortigas Center",
    description:
      "A practical choice with lots of options if you want something familiar, convenient, and easy to adjust.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=SM+Megamall+Ortigas",
    distanceFromOrtigas: "5 min walk",
    vibe: "Comfortable • Convenient",
  },
  {
    id: "greenfield-casual-night",
    name: "Casual night at Greenfield",
    cuisine: "Open-air casual",
    category: "Casual",
    priceRange: "₱",
    location: "Greenfield District, Mandaluyong",
    description:
      "A breezy, no-pressure option if you would rather keep it casual, walk around, and choose something simple.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Greenfield+District+Mandaluyong",
    distanceFromOrtigas: "10 min drive",
    vibe: "Casual • Open-air",
  },
  {
    id: "kapitolyo-food-crawl",
    name: "Kapitolyo food crawl",
    cuisine: "Choose as we go",
    category: "Casual",
    priceRange: "₱₱",
    location: "Kapitolyo, Pasig",
    description:
      "A playful option: pick one place for dinner and leave room for dessert or coffee somewhere nearby after.",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=Kapitolyo+Pasig+restaurants",
    distanceFromOrtigas: "10 min drive",
    vibe: "Playful • Food trip",
  },
  {
    id: "near-you-open",
    name: "Somewhere near you",
    cuisine: "Your comfort pick",
    category: "Casual",
    priceRange: "₱₱",
    location: "Ortigas / Pasig / Mandaluyong",
    description:
      "If you would rather stay close to where you are, choose the area and I will meet you there.",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&auto=format&fit=crop",
    mapsUrl: "https://maps.google.com/?q=restaurants+near+Ortigas+Pasig+Mandaluyong",
    distanceFromOrtigas: "Up to you",
    vibe: "Comfort-first • Flexible",
  },
];

export function getRestaurants(): Restaurant[] {
  return restaurants;
}
