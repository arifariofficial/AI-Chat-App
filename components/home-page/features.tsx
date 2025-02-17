import { Dictionary } from "@/lib/types";
import Image from "next/image";

export const FeatureSection = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              {dictionary.features.heading}
            </h1>
            <p className="md:text-md">{dictionary.features.description}</p>
          </div>
          <div className="relative mx-auto flex h-[400px] w-full max-w-[400px] items-center justify-center overflow-hidden rounded-lg">
            <Image
              src="/assets/ai-network-1.jpg"
              className="absolute left-0 top-0 h-full w-auto object-cover opacity-70"
              alt="AI Network"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
