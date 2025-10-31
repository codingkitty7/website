import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const sponsors = {
  brands: [
    {
      name: "Microsoft",
      href: "https://microsoft.com",
      logo: "/sponsors/microsoft.svg",
    },
    {
      name: "Test Sprite",
      href: "https://vercel.com",
      logo: "/sponsors/testsprite.png",
    },
  ],
};

export default function BrandSponsorsGrid() {
  return (
    <section className="mt-10">
      <h3 className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-sky-300 mb-4">
        Brand Sponsors
      </h3>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative w-full"
      >
        <CarouselContent>
          {sponsors.brands.map((brand) => (
            <CarouselItem
              key={brand.name}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 pl-5"
            >
              <Link
                href={brand.href}
                aria-label={brand.name}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-24 items-center justify-center rounded-xl bg-transparent transition-transform hover:scale-105"
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={160}
                    height={48}
                    className="h-10 w-auto opacity-70 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                ) : (
                  <span className="text-sm text-slate-700 dark:text-sky-200">
                    {brand.name}
                  </span>
                )}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious className="border-sky-200 bg-white text-slate-600 hover:bg-sky-50 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-100 dark:hover:bg-sky-800/60" />
        <CarouselNext className="border-sky-200 bg-white text-slate-600 hover:bg-sky-50 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-100 dark:hover:bg-sky-800/60" />
      </Carousel>
    </section>
  );
}
