import { Button, ButtonProps } from "../ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type CtaSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const CtaSection = (props: CtaSectionProps) => {
  const { heading, description, buttons, image } = {
    ...CtaSectionDefaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="border-border-primary grid auto-cols-fr grid-cols-1 border lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
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

export const CtaSectionDefaults: CtaSectionProps = {
  heading: "Empower Yourself with Our App",
  description:
    "Discover your rights and benefits effortlessly. Try our app for instant access to vital information.",
  buttons: [
    { title: "Try SipeChat", variant: "outline" },
    { title: "Learn More", variant: "outline" },
  ],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape4x3.svg",
    alt: "Relume placeholder image",
  },
};
