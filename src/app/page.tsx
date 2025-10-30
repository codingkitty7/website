import Navbar from "@/components/Navbar";
import { SponsorsSection } from "./sections/sponsors";
import { ToolsSection } from "./sections/tools";
import { TopicsAndSuggestions } from "./sections/suggestions";
import HeroSection from "./sections/hero";
import Footer from "./sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 transition-colors dark:bg-black">
      {/* Hero */}
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-3xl flex-col items-center justify-center px-6 py-20 sm:items-start">
        <HeroSection />
        <SponsorsSection />
        <ToolsSection />
        <TopicsAndSuggestions />

        {/* Optional: supporting text below the hero */}
        <div className="mt-10 text-zinc-400">
          <p className="text-sm">
            Tutorials, snippets, and bite-sized lessons — zero fluff.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
