"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import BrandSponsorsGrid from "./brands";
import CommunitySponsorsGrid from "./donations";

export function SponsorsSection() {
  return (
    <section className="mt-16 w-full">
      {/* Header */}
      <div className="flex flex-col items-start">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-sky-50">
          Donations & Sponsors
        </h2>
        <p className="mt-2 text-slate-600 dark:text-sky-200">
          Powered by{" "}
          <span className="font-medium text-slate-800 dark:text-sky-100">
            our amazing community supporters
          </span>{" "}
          and{" "}
          <span className="font-medium text-slate-800 dark:text-sky-100">
            some of the brands we trust
          </span>
        </p>

        {/* Action Buttons — now under tagline */}
        <div className="mt-5 flex flex-wrap gap-3">
          {/* Donate Button */}
          <Button
            asChild
            size="sm"
            className="rounded-full bg-sky-600 text-white transition-all hover:scale-[1.03] hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            <Link href="/donate">Donate</Link>
          </Button>

          {/* Sponsor Button */}
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-full border border-sky-300/60 bg-sky-50/50 text-sky-700 transition-all hover:scale-[1.03] hover:border-sky-400 hover:bg-sky-100 hover:text-sky-800 dark:border-sky-700/60 dark:bg-sky-900/40 dark:text-sky-100 dark:hover:border-sky-600 dark:hover:bg-sky-800/50 dark:hover:text-white"
          >
            <Link href="/sponsor">Become a Sponsor</Link>
          </Button>
        </div>
      </div>

      {/* Sections */}
      <CommunitySponsorsGrid />
      <BrandSponsorsGrid />
    </section>
  );
}
