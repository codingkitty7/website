"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const productLinks = [
    {
      href: "/products/app",
      title: "App Suite",
      desc: "Tools for analytics, workflow, and reports.",
    },
    {
      href: "/products/api",
      title: "Developer API",
      desc: "REST + Webhooks with first-class TypeScript types.",
    },
    {
      href: "/products/pricing",
      title: "Pricing",
      desc: "Simple, usage-based tiers for teams.",
    },
    {
      href: "/products/changelog",
      title: "Changelog",
      desc: "What’s new this week.",
    },
  ];

  const docLinks = [
    { href: "/docs/getting-started", label: "Getting Started" },
    { href: "/docs/components", label: "Components" },
    { href: "/docs/cli", label: "CLI" },
  ];

  return (
    <div className="mx-auto flex h-14 w-full max-w-3xl items-center px-4">
      <NavigationMenu className="text-zinc-900 dark:text-zinc-100">
        <NavigationMenuList className="gap-1">
          {/* Products */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="
                bg-transparent text-zinc-900 hover:bg-zinc-100
                data-[state=open]:bg-zinc-100
                dark:text-zinc-100 dark:hover:bg-zinc-900 dark:data-[state=open]:bg-zinc-900
                border border-transparent dark:border-zinc-800
                focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700
                transition-colors motion-reduce:transition-none
              "
            >
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="
                rounded-xl border border-zinc-200 bg-white shadow-lg
                dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30
              "
            >
              <div className="grid w-[500px] gap-3 p-4 sm:w-[600px] sm:grid-cols-2">
                {productLinks.map(({ href, title, desc }) => (
                  <NavigationMenuLink asChild key={href}>
                    <Link
                      href={href}
                      className="
                        block rounded-xl border p-4
                        border-zinc-200 hover:bg-zinc-100
                        dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700
                        transition-colors motion-reduce:transition-none
                      "
                    >
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        {title}
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {desc}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Docs */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="
                bg-transparent text-zinc-900 hover:bg-zinc-100
                data-[state=open]:bg-zinc-100
                dark:text-zinc-100 dark:hover:bg-zinc-900 dark:data-[state=open]:bg-zinc-900
                border border-transparent dark:border-zinc-800
                focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700
                transition-colors motion-reduce:transition-none
              "
            >
              Docs
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="
                rounded-xl border border-zinc-200 bg-white shadow-lg
                dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30
              "
            >
              <div className="w-[320px] p-3">
                <div className="space-y-1">
                  {docLinks.map(({ href, label }) => (
                    <NavigationMenuLink asChild key={href}>
                      <Link
                        href={href}
                        className="
                          block rounded-md p-2
                          text-zinc-900 hover:bg-zinc-100
                          dark:text-zinc-100 dark:hover:bg-zinc-900
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700
                          transition-colors motion-reduce:transition-none
                        "
                      >
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Community */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/community"
                className="
                  px-3 py-2 rounded-md
                  text-zinc-900 hover:text-zinc-950 hover:bg-zinc-100
                  dark:text-zinc-100 dark:hover:text-white dark:hover:bg-zinc-900
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700
                  transition-colors motion-reduce:transition-none
                "
              >
                Community
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side (e.g. theme toggle / auth later) */}
      <div className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
        {/* ... */}
      </div>
    </div>
  );
}
