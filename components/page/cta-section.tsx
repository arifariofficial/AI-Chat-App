import Image from "next/image";
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
        <div className="border-border-primary grid auto-cols-fr grid-cols-1 border p-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
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
          <div className="flex items-center justify-center overflow-hidden rounded-lg p-1">
            <Image
              src={image.src}
              className="m-1 h-full w-full scale-[1.2] object-cover p-2 opacity-50"
              alt={image.alt!}
              width={720}
              height={480}
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
    src: "/assets/car-accident.jpg",
    alt: "Relume placeholder image",
  },
};
