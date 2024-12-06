import { Locale } from "@/i18n.config";

export type Message = {
  name?: string;
  id: string;
  content: string;
  createdAt?: Date;
  role: "user" | "system" | "assistant";
  chatId?: string;
  edited?: string | null;
};

export interface Chat extends Record<string, unknown> {
  id: string;
  title: string;
  createdAt: Date | null;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string | null;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export interface Prompt {
  id?: string;
  temperature?: number | null | undefined;
  roleDefinition?: string | null | undefined;
  roleDefinitionPurpose?: string | null | undefined;
  userContext?: string | null | undefined;
  userContextPurpose?: string | null | undefined;
  guidelines?: string | null | undefined;
  guidelinesPurpose?: string | null | undefined;
  instructions?: string | null | undefined;
  instructionsPurpose?: string | null | undefined;
  keyPointers?: string | null | undefined;
  keyPointersPurpose?: string | null | undefined;
  responseLimitations?: string | null | undefined;
  responseLimitationsPurpose?: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonials {
  numberOfStars: number;
  quote: string;
  avatar: {
    src: string;
    alt: string;
  };
  name: string;
  position: string;
  logo: {
    src: string;
    alt: string;
  };
}
export interface ContactSection {
  tagline: string;
  heading: string;
  description: string;
  contacts: {
    icon: JSX.Element | string; // Use string for JSON compatibility
    title: string;
    description: string;
    link?: {
      label: string;
      url: string;
    };
    button?: {
      title: string;
      variant: "link" | "outline" | "solid";
      iconRight?: JSX.Element | string; // Use string for JSON compatibility
      onClick?: () => void | string; // Use string for JSON compatibility
    };
  }[];
}

export interface FooterColumnLinks {
  title: string;
  links: {
    title: string;
    url: string;
  }[];
}

export interface FooterSocialMediaLinks {
  url: string;
}

export interface Dictionary {
  navigation: {
    home: string;
    sipeChat: string;
    aboutUs: string;
    contact: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
  language: Record<Locale, string>;
  input: {
    email: string;
    password: string;
    passwordConfirmation: string;
    passwordReset: string;
    emailPlaceholder: string;
  };
  hero: {
    heading: string;
    description: string;
    inputPlaceholder: string;
    termsAndConditions: {
      text: string;
      link: string;
    };
    imageAlt: string;
  };
  features: {
    heading: string;
    description: string;
  };
  featuresList: {
    heading: string;
    description: string;
    buttonText: string;
    notification: string;
    features: {
      title: string;
      description: string;
      imageAlt: string;
    }[];
  };
  benefits: {
    heading: string;
    description: string;
    subHeadings: {
      title: string;
      description: string;
    }[];
  };
  auth: {
    signup: string;
    signin: string;
    signout: string;
  };
  validation: {
    emailRequired: string;
    emailInvalidTitle: string;
    emailInvalid: string;
    emailExists: string;
    emilAlreadyLoggedIn: string;
  };
  faqSection: {
    heading: string;
    description: string;
    contactUs: string;
    questions: {
      title: string;
      answer: string;
    }[];
    footerHeading: string;
    footerDescription: string;
    button: {
      title: string;
      variant: string;
    };
  };
  ctaSection: {
    heading: string;
    description: string;
    button1: string;
    button2: string;
  };
  testimonialSection: {
    heading: string;
    description: string;
    testimonials: Testimonials;
  };
  contactSection: {
    tagline: string;
    heading: string;
    description: string;
    contacts: {
      icon: string;
      title: string;
      description: string;
      link?: {
        label: string;
        url: string;
      };
      button?: {
        title: string;
      };
    }[];
  };
  footer: {
    newsletterHeading: string;
    newsletterDescription: string;
    inputPlaceholder: string;
    button: {
      title: string;
    };
    columnLinks: FooterColumnLinks[];
    socialMediaLinks: FooterSocialMediaLinks[];
    footerLinks: {
      title: string;
      url: string;
    }[];
    footerText: string;
    termsAndConditions: string;
    logo: {
      url: string;
      alt: string;
    };
  };
}
