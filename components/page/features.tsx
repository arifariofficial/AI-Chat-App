import Image from "next/image";

const FeatureSectionDefaults: FeatureSectionProps = {
  heading: "Discover Your Rights with Our Innovative AI App",
  description:
    "Our cutting-edge AI app simplifies the process of understanding your rights across various situations. With just a few taps, you can access tailored information that ensures you know exactly what you're entitled to.",
  image: {
    src: "/assets/ai-network-1.jpg",
    alt: "Relume placeholder image",
  },
};

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  image: ImageProps;
};

type FeatureSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const FeatureSection = (props: FeatureSectionProps) => {
  const { heading, description, image } = {
    ...FeatureSectionDefaults,
    ...props,
  } as Props;
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <p className="md:text-md">{description}</p>
          </div>
          <div className="relative mx-auto flex h-[400px] w-full max-w-[400px] items-center justify-center overflow-hidden rounded-lg">
            <Image
              src={image.src}
              className="absolute left-0 top-0 h-full w-auto object-cover opacity-70"
              alt={image.alt || "Image"}
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
