import Image from "next/image";
import { BiSolidStar } from "react-icons/bi";

const TestimonialSectionDefaults: TestimonialSectionProps = {
  heading: "Customer Testimonials",
  description: "This app transformed my understanding of my rights.",
  testimonials: [
    {
      numberOfStars: 5,
      quote: '"With the AI app, I felt empowered and informed."',
      avatar: {
        src: "/assets/testimonial-1.webp",
        alt: "Testimonial avatar 1",
      },
      name: "Sami Mäkinen",
      position: "Doctor, GreenLife",
      logo: {
        src: "/assets/company-1.webp",
        alt: "Webflow logo 1",
      },
    },
    {
      numberOfStars: 5,
      quote: '"I never knew I had so many options available!"',
      avatar: {
        src: "/assets/testimonial-2.webp",
        alt: "Testimonial avatar 2",
      },
      name: "Juuso Montonen",
      position: "Guitar Teacher, Kitarakoutsi, Inc.",
      logo: {
        src: "/assets/company-2.webp",
        alt: "Webflow logo 2",
      },
    },
  ],
};

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

type TestimonialSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const TestimonialSection = (props: TestimonialSectionProps) => {
  const { heading, description, testimonials } = {
    ...TestimonialSectionDefaults,
    ...props,
  } as Props;
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="md:mb-18 mb-12 w-full lg:mb-20">
          <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
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
    <div className="mt-6 flex w-full flex-col gap-2 md:mt-8 md:w-auto md:flex-row md:items-center">
      <div>
        <Image
          src={testimonial.avatar.src}
          alt={testimonial.avatar.alt!}
          width={400}
          height={400}
          className="size-20 min-h-8 min-w-8 rounded-full object-cover"
        />
      </div>
      <div className="mb-4 md:mb-0">
        <p className="font-semibold">{testimonial.name}</p>
        <p>{testimonial.position}</p>
      </div>
      <div className="hidden w-px self-stretch bg-black md:block" />
      <div className="relative h-12 w-12 overflow-hidden rounded-full">
        <Image
          src={testimonial.logo.src}
          alt={testimonial.logo.alt!}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute max-h-12 border"
        />
      </div>
    </div>
  </div>
);
