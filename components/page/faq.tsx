import { Button, ButtonProps } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type QuestionsProps = {
  title: string;
  answer: string;
};

type Props = {
  heading: string;
  description: string;
  footerHeading: string;
  footerDescription: string;
  button: ButtonProps;
  questions: QuestionsProps[];
};

export type FaqSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const FaqSection = (props: FaqSectionProps) => {
  const { heading, description, questions, footerHeading, footerDescription } =
    {
      ...FaqSectionDefaults,
      ...props,
    } as Props;
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="md:mb-18 mb-12 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
        <Accordion
          type="multiple"
          className="grid w-full grid-cols-1 items-start gap-x-8 gap-y-4 md:grid-cols-2"
        >
          {questions.map((question, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border border-border/60 px-5 md:px-6"
            >
              <AccordionTrigger className="md:text-md md:py-5 [&[data-state=open]>svg]:rotate-180">
                {question.title}
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="md:mt-18 mx-auto mt-12 max-w-md text-center lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            {footerHeading}
          </h4>
          <p className="md:text-md">{footerDescription}</p>
          <div className="mt-6 md:mt-8">
            <Button asChild variant="outline">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FaqSectionDefaults: FaqSectionProps = {
  heading: "FAQs",
  description:
    "Find answers to common questions about our services and AI app.",
  questions: [
    {
      title: "What is your service?",
      answer:
        "We provide information on rights related to various cases. Our AI app simplifies this process by delivering tailored insights. Whether it's a car accident or another issue, we guide you through your rights.",
    },
    {
      title: "Can I get support?",
      answer:
        "Absolutely! We offer support through our customer service team. You can reach out via the app or our website for assistance at any time.",
    },
    {
      title: "How does the app work?",
      answer:
        "Our app collects relevant information about your case. It analyses the data to inform you of your rights. This ensures you have the knowledge needed to make informed decisions.",
    },
    {
      title: "What if I have more questions?",
      answer:
        "If you have additional questions, don’t hesitate to contact us. We are here to provide clarity and support. Your understanding is our priority.",
    },
    {
      title: "Is the service free?",
      answer:
        "Yes, our initial consultation and access to the AI app are free. We believe in empowering individuals with knowledge without financial barriers. Additional services may incur charges, which will be clearly communicated.",
    },
    {
      title: "Is my data secure?",
      answer:
        "Yes, we take data security very seriously. Your information is protected with industry-standard encryption and privacy measures. We do not share your data without your consent.",
    },
    {
      title: "Who can use it?",
      answer:
        "Our services are designed for anyone seeking information about their rights. Whether you're involved in a car accident or facing other legal issues, we are here to help. Our app is user-friendly and accessible to all.",
    },
    {
      title: "How often is information updated?",
      answer:
        "Our app regularly updates its information to ensure accuracy. We monitor legal changes and adjust our content accordingly. This guarantees you receive the most current advice.",
    },
    {
      title: "How do I start?",
      answer:
        "Getting started is simple! Download our app and create an account to begin. Follow the prompts to enter your case details and discover your rights.",
    },
    {
      title: "Can I provide feedback?",
      answer:
        "We welcome your feedback! It helps us improve our services and app functionality. You can submit your thoughts through the app or our website.",
    },
  ],
  footerHeading: "Still have questions?",
  footerDescription: "Reach out to us anytime for assistance.",
  button: {
    title: "Contact",
    variant: "outline",
  },
};
