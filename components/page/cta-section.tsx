import Image from "next/image";
import { Button, ButtonProps } from "../ui/button";
import Link from "next/link";

const CtaSectionDefaults: CtaSectionProps = {
  heading: "Empower Yourself with Our App",
  description:
    "Discover your rights and benefits effortlessly. Try our app for instant access to vital information.",
  buttons: [
    { title: "Try SipeChat", variant: "outline", href: "/chat" },
    { title: "Learn More", variant: "outline", href: "/more" },
  ],
  image: {
    src: "/assets/car-accident.jpg",
    alt: "Relume placeholder image",
  },
};

type ImageProps = {
  src: string;
  alt?: string;
};

interface ButtonProp extends ButtonProps {
  href?: string;
}

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProp[];
  image: ImageProps;
};

type CtaSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const CtaSection = (props: CtaSectionProps) => {
  const { heading, description, buttons, image } = {
    ...CtaSectionDefaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 rounded-lg border border-border/40 p-1 shadow-md lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Link href={`${button.href}`} key={index}>
                  <Button {...button}>{button.title}</Button>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center overflow-hidden rounded-lg">
            <Image
              src={image.src}
              className="h-full w-auto scale-[1.2] object-cover opacity-70"
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
