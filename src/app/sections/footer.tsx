// components/Footer.tsx
"use client";

import Link from "next/link";
import { Instagram, Youtube, Music2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-zinc-950/80 text-zinc-300 dark:bg-black/80">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* Top: brand + blurb */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
          <div className="max-w-lg">
            <div className="text-white">
              <span className="text-lg font-semibold">
                The Coding Kitty Project
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">
              Free, easy-to-follow coding content for everyone. Short,
              practical, no fluff.
            </p>

            {/* Social icons */}
            <div className="mt-4 flex gap-3">
              <SocialIcon
                href="https://www.instagram.com/coding.kitty"
                label="Instagram"
                color="instagram"
                icon={<Instagram className="h-5 w-5" />}
              />
              <SocialIcon
                href="https://www.tiktok.com/@coding.kitty"
                label="TikTok"
                color="tiktok"
                icon={<Music2 className="h-5 w-5" />}
              />
              <SocialIcon
                href="https://www.youtube.com/@codingkitty"
                label="YouTube"
                color="youtube"
                icon={<Youtube className="h-5 w-5" />}
              />
            </div>
          </div>

          {/* CTA: quick links badge row (optional) */}
          <div className="flex flex-wrap gap-2 text-sm">
            <BadgeLink href="/learn">Learn</BadgeLink>
            <BadgeLink href="/community">Community</BadgeLink>
            <BadgeLink href="/sponsor">Sponsor</BadgeLink>
            <BadgeLink href="/contact">Contact</BadgeLink>
          </div>
        </div>

        {/* Middle: link columns */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <LinkCol
            title="Content"
            links={[
              { href: "/topics", label: "Topics" },
              { href: "/videos", label: "Videos" },
              { href: "/snippets", label: "Code snippets" },
              { href: "/newsletter", label: "Newsletter" },
            ]}
          />
          <LinkCol
            title="Project"
            links={[
              { href: "/about", label: "About" },
              { href: "/sponsor", label: "Sponsors" },
              { href: "/tools", label: "Tools we use" },
              { href: "/roadmap", label: "Roadmap" },
            ]}
          />
          <LinkCol
            title="Legal"
            links={[
              { href: "/terms", label: "Terms" },
              { href: "/privacy", label: "Privacy" },
              { href: "/disclosure", label: "Affiliate disclosure" },
              { href: "/cookies", label: "Cookies" },
            ]}
          />
        </div>

        {/* Bottom: fine print */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-zinc-800 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} The Coding Kitty Project. All rights
            reserved.
          </p>
          <p className="leading-relaxed">
            Some links may be affiliate links. We only recommend tools we
            actually use.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Helpers */

function LinkCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="text-sm font-medium text-zinc-200">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function BadgeLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
    >
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  icon,
  color,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  color: "instagram" | "tiktok" | "youtube";
}) {
  const colorMap = {
    instagram: "hover:border-pink-500 hover:text-pink-500",
    tiktok: "hover:border-cyan-400 hover:text-cyan-400",
    youtube: "hover:border-red-500 hover:text-red-500",
  };
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 transition-all hover:scale-105 ${colorMap[color]}`}
    >
      {icon}
    </Link>
  );
}
