"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Tool = {
  name: string;
  logo?: string;
  tagline: string;
  highlights: string[];
  categories: string[];
  href: string; // affiliate link
  reviewHref?: string;
};

const tools: Tool[] = [
  {
    name: "Supabase",
    logo: "/logos/supabase.svg",
    tagline: "Postgres + Auth + Storage for your apps.",
    highlights: ["Generous free tier", "Edge functions", "Realtime"],
    categories: ["Backend", "Database"],
    href: "https://supabase.com/?utm_source=codingkitty&utm_medium=affiliate&utm_campaign=tools",
    reviewHref: "/reviews/supabase",
  },
  {
    name: "Railway",
    logo: "/logos/railway.svg",
    tagline: "Deploy apps and databases in minutes.",
    highlights: ["One-click deploy", "Usage-based pricing", "Great DX"],
    categories: ["Hosting", "DevOps"],
    href: "https://railway.app?ref=codingkitty&utm_source=codingkitty&utm_medium=affiliate",
    reviewHref: "/reviews/railway",
  },
  {
    name: "PlanetScale",
    logo: "/logos/planetscale.svg",
    tagline: "Serverless MySQL with branching.",
    highlights: ["Zero-downtime", "Schema branching", "Prisma-ready"],
    categories: ["Database"],
    href: "https://planetscale.com/?utm_source=codingkitty&utm_medium=affiliate",
    reviewHref: "/reviews/planetscale",
  },
  {
    name: "Vercel",
    logo: "/logos/vercel.svg",
    tagline: "Ship Next.js sites at ludicrous speed.",
    highlights: ["Edge network", "Preview deploys", "Analytics"],
    categories: ["Hosting", "Frontend"],
    href: "https://vercel.com/?utm_source=codingkitty&utm_medium=affiliate",
    reviewHref: "/reviews/vercel",
  },
];

export function ToolsSection() {
  return (
    <section className="mt-16 w-full">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Tools Kitty Uses
          </h2>
          <p className="mt-2 text-zinc-400">
            Battle-tested services we actually use to build and teach — some
            links are affiliate.
          </p>
        </div>
        <Badge className="h-6 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs text-zinc-300">
          curated
        </Badge>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Card
            key={t.name}
            className="border-zinc-800 bg-zinc-950/60 backdrop-blur transition-colors hover:bg-zinc-900/60"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                {t.logo ? (
                  <Image
                    src={t.logo}
                    alt={t.name}
                    width={28}
                    height={28}
                    className="h-7 w-7"
                  />
                ) : (
                  <div className="h-7 w-7 rounded bg-zinc-800" />
                )}
                <CardTitle className="text-base text-zinc-100">
                  {t.name}
                </CardTitle>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.categories.map((c) => (
                  <Badge
                    key={c}
                    variant="outline"
                    className="border-zinc-800 text-zinc-300"
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-zinc-400">{t.tagline}</p>

              <ul className="grid list-inside list-disc gap-1 pl-1 text-sm text-zinc-300">
                {t.highlights.map((h) => (
                  <li key={h} className="marker:text-zinc-500">
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild className="w-full sm:w-auto">
                  <Link
                    href={t.href}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                  >
                    Visit {t.name}
                  </Link>
                </Button>

                {t.reviewHref && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-zinc-800 bg-transparent text-zinc-200 hover:bg-zinc-900 sm:w-auto"
                  >
                    <Link href={t.reviewHref}>Read review</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Disclosure */}
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Some links are affiliate links, which means we may earn a small
        commission if you purchase through them — at no extra cost to you. We
        only recommend tools we genuinely use for{" "}
        <span className="text-zinc-300">The Coding Kitty Project</span>.
      </p>
    </section>
  );
}
