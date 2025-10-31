// Deterministic color picker from name
function getColorClasses(name: string) {
  const palette = [
    // light / dark pairs
    {
      bg: "bg-sky-100",
      text: "text-sky-700",
      darkBg: "dark:bg-sky-900/60",
      darkText: "dark:text-sky-100",
    },
    {
      bg: "bg-indigo-100",
      text: "text-indigo-700",
      darkBg: "dark:bg-indigo-900/60",
      darkText: "dark:text-indigo-100",
    },
    {
      bg: "bg-rose-100",
      text: "text-rose-700",
      darkBg: "dark:bg-rose-900/60",
      darkText: "dark:text-rose-100",
    },
    {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      darkBg: "dark:bg-emerald-900/60",
      darkText: "dark:text-emerald-100",
    },
    {
      bg: "bg-amber-100",
      text: "text-amber-800",
      darkBg: "dark:bg-amber-900/60",
      darkText: "dark:text-amber-100",
    },
    {
      bg: "bg-fuchsia-100",
      text: "text-fuchsia-700",
      darkBg: "dark:bg-fuchsia-900/60",
      darkText: "dark:text-fuchsia-100",
    },
    {
      bg: "bg-cyan-100",
      text: "text-cyan-700",
      darkBg: "dark:bg-cyan-900/60",
      darkText: "dark:text-cyan-100",
    },
    {
      bg: "bg-lime-100",
      text: "text-lime-800",
      darkBg: "dark:bg-lime-900/60",
      darkText: "dark:text-lime-100",
    },
  ];

  // simple hash
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  const idx = Math.abs(hash) % palette.length;
  return palette[idx];
}

export default function AvatarCircle({ name }: { name: string }) {
  const { bg, text, darkBg, darkText } = getColorClasses(name);
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "flex h-16 w-16 items-center justify-center rounded-full",
          "shadow-sm ring-1 ring-black/5 dark:ring-white/5",
          bg,
          text,
          darkBg,
          darkText,
        ].join(" ")}
        title={name}
        aria-label={name}
      >
        <span className="text-xl font-semibold">{initial}</span>
      </div>
      <span className="text-xs text-slate-600 dark:text-sky-200">{name}</span>
    </div>
  );
}
