export type RestaurantCategory =
  | "Italian"
  | "Japanese"
  | "Steak"
  | "Korean"
  | "Cafe"
  | "Dessert"
  | "Casual"
  | "Fine Dining";

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  category: RestaurantCategory;
  priceRange: "₱" | "₱₱" | "₱₱₱" | "₱₱₱₱";
  location: string;
  description: string;
  image: string;
  mapsUrl: string;
  distanceFromOrtigas?: string;
  vibe?: string;
};

export type DateOption = {
  id: string;
  label: string; // e.g. "Friday night"
  date: string; // ISO date YYYY-MM-DD
  helper?: string; // e.g. "Aug 29"
};

export type TimeOption = {
  id: string;
  label: string; // "6:00 PM"
  value: string; // "18:00"
};

export type ActivityOption = {
  id: string;
  label: string;
  emoji: string;
  description?: string;
  href?: string;
};

export type DateResponse = {
  id?: string;
  invite_slug: string;
  status: "accepted" | "undecided" | "declined";
  selected_date?: string | null;
  selected_time?: string | null;
  selected_restaurant_id?: string | null;
  selected_restaurant_name?: string | null;
  custom_restaurant?: string | null;
  selected_activity?: string | null;
  custom_activity?: string | null;
  personal_message?: string | null;
  created_at?: string;
};

export type DatePlan = {
  date: DateOption | null;
  time: TimeOption | null;
  restaurant: Restaurant | null;
  customRestaurant: string | null;
  activity: ActivityOption | null;
  customActivity: string | null;
  personalMessage: string;
  inviteeName?: string;
};
