type ImageProps = {
  src: string;
  alt?: string;
};

type SubHeadingProps = {
  icon: ImageProps;
  title: string;
  description: string;
};

type Props = {
  heading: string;
  description: string;
  subHeadings: SubHeadingProps[];
  image: ImageProps;
};

export type BenefitSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const BenefitSection = (props: BenefitSectionProps) => {
  const { heading, description, image, subHeadings } = {
    ...BenefitSectionDefaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <p className="md:text-md mb-6 md:mb-8">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <div className="mb-3 md:mb-4">
                    <img
                      src={subHeading.icon.src}
                      className="size-12"
                      alt={subHeading.icon.alt}
                    />
                  </div>
                  <h6 className="text-md mb-3 font-bold leading-[1.4] md:mb-4 md:text-xl">
                    {subHeading.title}
                  </h6>
                  <p>{subHeading.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src={image.src}
              className="w-full object-cover"
              alt={image.alt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const BenefitSectionDefaults: BenefitSectionProps = {
  heading:
    "Discover the transformative benefits of our AI-powered rights information app.",
  description:
    "Our AI app streamlines the process of understanding your rights, saving you valuable time. With precise information at your fingertips, you can navigate your case with confidence.",
  subHeadings: [
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Relume logo 1",
      },
      title: "Time-Saving",
      description:
        "Get instant access to essential information without the hassle of extensive research.",
    },
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Relume logo 1",
      },
      title: "Accurate Insights",
      description:
        "Rely on our AI for accurate, up-to-date information tailored to your specific situation.",
    },
  ],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image",
  },
};
