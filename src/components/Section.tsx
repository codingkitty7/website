"use client";

import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string; // extra padding, etc.
  as?: any;
};

export default function Section({
  children,
  className = "",
  as: Tag = "section",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Tag
        className={[
          "rounded-2xl border border-zinc-800 bg-zinc-950/70 dark:bg-black/60",
          "shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur",
          "ring-1 ring-black/0", // keeps focus smooth on dark
          className,
        ].join(" ")}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
