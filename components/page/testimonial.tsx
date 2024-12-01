import { BiSolidStar } from "react-icons/bi";

type ImageProps = {
  src: string;
  alt?: string;
};

type Testimonial = {
  numberOfStars: number;
  quote: string;
  avatar: ImageProps;
  name: string;
  position: string;
  logo: ImageProps;
};

type Props = {
  heading: string;
  description: string;
  testimonials: Testimonial[];
};

export type TestimonialSectionProps =
  React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const TestimonialSection = (props: TestimonialSectionProps) => {
  const { heading, description, testimonials } = {
    ...TestimonialSectionDefaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="md:mb-18 mb-12 w-full lg:mb-20">
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h1>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
    <div className="mb-6 flex md:mb-8">
      {Array(testimonial.numberOfStars)
        .fill(null)
        .map((_, starIndex) => (
          <BiSolidStar key={starIndex} className="size-6" />
        ))}
    </div>
    <blockquote className="text-md font-bold leading-[1.4] md:text-xl">
      {testimonial.quote}
    </blockquote>
    <div className="mt-6 flex w-full flex-col gap-3 md:mt-8 md:w-auto md:flex-row md:items-center md:gap-5">
      <div>
        <img
          src={testimonial.avatar.src}
          alt={testimonial.avatar.alt}
          className="size-14 min-h-14 min-w-14 rounded-full object-cover"
        />
      </div>
      <div className="mb-4 md:mb-0">
        <p className="font-semibold">{testimonial.name}</p>
        <p>{testimonial.position}</p>
      </div>
      <div className="hidden w-px self-stretch bg-black md:block" />
      <div>
        <img
          src={testimonial.logo.src}
          alt={testimonial.logo.alt}
          className="max-h-12"
        />
      </div>
    </div>
  </div>
);

export const TestimonialSectionDefaults: TestimonialSectionProps = {
  heading: "Customer testimonials",
  description: "This app transformed my understanding of my rights.",
  testimonials: [
    {
      numberOfStars: 5,
      quote: '"With the AI app, I felt empowered and informed."',
      avatar: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Testimonial avatar 1",
      },
      name: "Sami Mäkinen",
      position: "Teacher, Webflow, Inc.",
      logo: {
        src: "https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg",
        alt: "Webflow logo 1",
      },
    },
    {
      numberOfStars: 5,
      quote: '"I never knew I had so many options available!"',
      avatar: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Testimonial avatar 2",
      },
      name: "Juuso Montonen",
      position: "Guitar Teacher, Kitarakoutsi, Inc.",
      logo: {
        src: "https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg",
        alt: "Webflow logo 2",
      },
    },
  ],
};
