"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Youtube, Music2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] dark:bg-black/80">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-zinc-700/10 blur-3xl" />
        <div className="absolute -bottom-20 right-10 h-40 w-40 rounded-full bg-zinc-500/10 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative max-w-3xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1 text-xs tracking-wide text-zinc-300 backdrop-blur-sm">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-zinc-300" />
          The Coding Kitty Project
        </span>

        {/* Profile + Title */}
        <div className="mt-6 flex items-center gap-6">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-zinc-700 bg-zinc-900">
            <Image
              src="/cat.webp"
              alt="The Coding Kitty"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold leading-snug text-white sm:text-4xl">
              The Coding Kitty Project
            </h1>
            <p className="mt-2 max-w-xl text-lg text-zinc-400 sm:text-xl">
              Free, easy-to-follow coding content for everyone.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-4">
              <SocialIcon
                href="https://www.instagram.com/coding.kitty"
                label="Instagram"
                color="instagram"
                icon={<Instagram className="h-6 w-6" />}
              />
              <SocialIcon
                href="https://www.tiktok.com/@coding.kitty"
                label="TikTok"
                color="tiktok"
                icon={<Music2 className="h-6 w-6" />}
              />
              <SocialIcon
                href="https://www.youtube.com/@codingkitty"
                label="YouTube"
                color="youtube"
                icon={<Youtube className="h-6 w-6" />}
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:grid-cols-4">
          <Stat label="Videos Created" value="42" />
          <Stat label="In Progress" value="5" />
          <Stat label="Suggestions" value="138" />
          <Stat label="Donations Made" value="67" />
        </div>
      </motion.div>

      {/* Bottom light accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  );
}

/* Social Icon component with brand colors */
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
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 transition-all hover:scale-110 ${colorMap[color]}`}
    >
      {icon}
    </Link>
  );
}

/* Stat Box */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <span className="text-2xl font-semibold text-white">{value}</span>
      <span className="text-sm text-zinc-400">{label}</span>
    </div>
  );
}
