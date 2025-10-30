import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- Sponsors data ---
const sponsors = {
  brands: [
    {
      name: "Supabase",
      href: "https://supabase.com",
      logo: "/logos/supabase.svg",
    },
    { name: "Vercel", href: "https://vercel.com", logo: "/logos/vercel.svg" },
    {
      name: "Railway",
      href: "https://railway.app",
      logo: "/logos/railway.svg",
    },
    {
      name: "PlanetScale",
      href: "https://planetscale.com",
      logo: "/logos/planetscale.svg",
    },
  ],
  community: [
    { name: "Alice", href: "#", logo: "" },
    { name: "Bruno", href: "#", logo: "" },
    { name: "Chandra", href: "#", logo: "" },
    { name: "Dani", href: "#", logo: "" },
    { name: "Eva", href: "#", logo: "" },
    { name: "Finn", href: "#", logo: "" },
  ],
};

export function SponsorsSection() {
  return (
    <section className="mt-16 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Sponsors</h2>
          <p className="mt-2 text-zinc-400">
            Powered by{" "}
            <span className="font-medium text-zinc-300">brands we trust</span>{" "}
            and{" "}
            <span className="font-medium text-zinc-300">
              our amazing community supporters
            </span>
            .
          </p>
        </div>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-zinc-800 bg-transparent hover:bg-zinc-900"
        >
          <Link href="/sponsor">Become a sponsor</Link>
        </Button>
      </div>

      {/* Brand sponsors */}
      <section className="mt-10">
        <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
          Brand Sponsors
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {sponsors.brands.map((brand) => (
            <Card
              key={brand.name}
              className="border-zinc-800 bg-zinc-950/60 backdrop-blur transition-colors hover:bg-zinc-900/60"
            >
              <Link href={brand.href} aria-label={brand.name} target="_blank">
                <CardContent className="flex h-24 items-center justify-center p-4">
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={160}
                      height={48}
                      className="h-10 w-auto opacity-90"
                    />
                  ) : (
                    <span className="text-sm text-zinc-300">{brand.name}</span>
                  )}
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Community supporters */}
      <section className="mt-12">
        <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
          Community Supporters
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {sponsors.community.map((member) => (
            <Card
              key={member.name}
              className="border-zinc-800 bg-zinc-950/60 backdrop-blur transition-colors hover:bg-zinc-900/60"
            >
              <CardContent className="flex h-16 items-center justify-center p-3 text-zinc-300">
                {member.name}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}
