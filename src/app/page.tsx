import Navbar from "@/components/Navbar";
import HeroSection from "./sections/hero";
import Footer from "./sections/footer";
import { SponsorsSection } from "./sections/sponsors/sponsors";
import { ToolsSection } from "./sections/tools";
import { TopicsAndSuggestions } from "./sections/suggestions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-sky-50 font-sans text-zinc-800 transition-colors dark:bg-sky-950 dark:text-sky-50">
      {/* Optional Navbar */}
      {/* <header className="sticky top-0 z-50 w-full border-b border-sky-200 bg-white/70 backdrop-blur dark:border-sky-900 dark:bg-sky-950/70">
        <Navbar />
      </header> */}

      {/* Hero Section */}
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-3xl flex-col items-center justify-center px-6 py-20 sm:items-start">
        <HeroSection />

        <SponsorsSection />
        <TopicsAndSuggestions />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
