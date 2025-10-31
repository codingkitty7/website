"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Youtube, Music2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-sky-200 bg-white p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] dark:border-sky-800 dark:bg-sky-900 dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-800/30" />
        <div className="absolute -bottom-20 right-10 h-40 w-40 rounded-full bg-sky-100/60 blur-2xl dark:bg-sky-700/30" />
      </div>

      <TooltipProvider>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative max-w-3xl"
        >
          <div className="flex flex-inline gap-2">
            <HeroBadge>coding</HeroBadge>
            <HeroBadge>kitty</HeroBadge>
            <HeroBadge>easy</HeroBadge>
          </div>

          {/* Profile + Title */}
          <div className="mt-6 flex items-center gap-6">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-sky-200 bg-white dark:border-sky-800 dark:bg-sky-950">
              <Image
                src="/cat.webp"
                alt="The Coding Kitty"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold leading-snug text-slate-900 sm:text-4xl dark:text-sky-50">
                The{" "}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="relative inline-block cursor-pointer underline-offset-4 hover:underline"
                      tabIndex={0}
                    >
                      <span className="relative">
                        coding.kitty
                        {/* blue underline stroke */}
                        <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-sky-400 dark:bg-sky-500" />
                      </span>
                    </span>
                  </TooltipTrigger>

                  {/* Tooltip with social icons */}
                  {/* Tooltip with CAT */}
                  <TooltipContent
                    side="bottom"
                    align="start"
                    className="border-sky-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-sky-800 dark:bg-sky-900/95"
                  >
                    <motion.div
                      initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-sky-200 bg-white dark:border-sky-800 dark:bg-sky-950">
                        <Image
                          src="/cat.webp"
                          alt="Meow!"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-slate-800 dark:text-sky-100">
                          Meow there! 🐾
                        </div>
                        <div className="text-slate-600 dark:text-sky-200/90">
                          coding.kitty approves.
                        </div>
                      </div>
                    </motion.div>
                  </TooltipContent>
                </Tooltip>{" "}
                Project
              </h1>

              <p className="mt-2 max-w-xl text-lg text-slate-600 sm:text-xl dark:text-sky-200">
                Free, easy-to-follow coding content for everyone.
              </p>

              <SocialIcons />
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-10 grid grid-cols-2 gap-4 rounded-xl border border-sky-200 bg-sky-50 p-4 sm:grid-cols-4 dark:border-sky-800 dark:bg-sky-900/60">
            <Stat label="Videos Created" value="42" />
            <Stat label="In Progress" value="5" />
            <Stat label="Suggestions" value="138" />
            <Stat label="Donations Made" value="67" />
          </div>
        </motion.div>
      </TooltipProvider>
    </section>
  );
}

function SocialIcons() {
  return (
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
  );
}
/* Social Icon (brand hover accents) */
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
    tiktok: "hover:border-cyan-500 hover:text-cyan-500",
    youtube: "hover:border-red-500 hover:text-red-500",
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-white text-slate-700 transition-all hover:scale-110 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-200 ${colorMap[color]}`}
    >
      {icon}
    </Link>
  );
}

/* Stat Box */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <span className="text-2xl font-semibold text-slate-900 dark:text-white">
        {value}
      </span>
      <span className="text-sm text-slate-500 dark:text-sky-300/80">
        {label}
      </span>
    </div>
  );
}

function HeroBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs tracking-wide text-sky-700 backdrop-blur-sm dark:border-sky-800 dark:bg-sky-900/70 dark:text-sky-200">
      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sky-500 dark:bg-sky-300" />
      {children}
    </span>
  );
}
