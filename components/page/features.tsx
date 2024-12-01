import Image from "next/image";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  image: ImageProps;
};

export type FeatureSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const FeatureSection = (props: FeatureSectionProps) => {
  const { heading, description, image } = {
    ...FeatureSectionDefaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <p className="md:text-md">{description}</p>
          </div>
          <div className="h-full overflow-hidden rounded-lg border">
            <Image
              src={image.src}
              className="h-full w-full object-cover opacity-80"
              alt={image.alt!}
              width={400}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeatureSectionDefaults: FeatureSectionProps = {
  heading: "Empower Yourself: Discover Your Rights with Our Innovative AI App",
  description:
    "Our cutting-edge AI app simplifies the process of understanding your rights across various situations. With just a few taps, you can access tailored information that ensures you know exactly what you're entitled to.",
  image: {
    src: "/assets/hand-shaking.jpg",
    alt: "Relume placeholder image",
  },
};
