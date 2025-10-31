import AvatarCircle from "@/components/AvatarCircle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sponsors = {
  community: [
    { name: "Alice" },
    { name: "Finn" },
    { name: "Liam" },
    { name: "Zara" },
  ],
};

export default function CommunitySponsorsGrid() {
  return (
    <section className="mt-12">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-sky-300">
        Community Supporters
      </h3>

      <Carousel
        opts={{ align: "start", loop: true }}
        className="relative w-full"
      >
        <CarouselContent className="-ml-2">
          {sponsors.community.map((member) => (
            <CarouselItem
              key={member.name}
              className="basis-1/3 pl-2 sm:basis-1/4 md:basis-1/6"
            >
              <div className="flex h-24 items-center justify-center">
                <AvatarCircle name={member.name} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="border-sky-200 bg-white text-slate-600 hover:bg-sky-50 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-100 dark:hover:bg-sky-800/60" />
        <CarouselNext className="border-sky-200 bg-white text-slate-600 hover:bg-sky-50 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-100 dark:hover:bg-sky-800/60" />
      </Carousel>
    </section>
  );
}
