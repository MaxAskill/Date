import type { Metadata } from "next";
import { CreatorDashboard } from "@/components/CreatorDashboard";

export const metadata: Metadata = {
  title: "Creator dashboard",
  description: "View responses to your date invitation.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <CreatorDashboard />;
}
