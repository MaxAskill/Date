import type { Metadata } from "next";
import { InvitationFlow } from "@/components/InvitationFlow";
import { slugify } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function prettifyName(slug: string): string | undefined {
  if (!slug) return undefined;
  const cleaned = slug.replace(/-/g, " ").trim();
  if (!cleaned) return undefined;
  return cleaned
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

type Params = { name: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { name } = params;
  const pretty = prettifyName(name);
  const title = "I have something to ask you 💕";
  const description = "There's a little invitation waiting for you.";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/for/${name}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/for/${name}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function InvitePage({
  params,
}: {
  params: Params;
}) {
  const { name } = params;
  const slug = slugify(name) || "invite";
  const pretty = prettifyName(name);

  return <InvitationFlow inviteSlug={slug} inviteeName={pretty} />;
}
