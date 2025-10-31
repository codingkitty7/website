"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import BrandSponsorsGrid from "./brands";
import CommunitySponsorsGrid from "./donations";

// --- Sponsors data ---

export function SponsorsSection() {
  return (
    <section className="mt-16 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-sky-50">
            Sponsors
          </h2>
          <p className="mt-2 text-slate-600 dark:text-sky-200">
            Powered by{" "}
            <span className="font-medium text-slate-800 dark:text-sky-100">
              brands we trust
            </span>{" "}
            and{" "}
            <span className="font-medium text-slate-800 dark:text-sky-100">
              our amazing community supporters
            </span>
            .
          </p>
        </div>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-sky-200 bg-white text-slate-700 hover:bg-sky-50 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-100 dark:hover:bg-sky-800/60"
        >
          <Link href="/sponsor">Become a sponsor</Link>
        </Button>
      </div>

      <CommunitySponsorsGrid />
      <BrandSponsorsGrid />
    </section>
  );
}
