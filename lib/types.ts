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

export interface ChatPage {
  header: string;
  description: string;
}

export interface TeamMember {
  name: string;
  jobTitle: string;
  email: string;
  mobile: string;
  description: string;
  image: {
    src: string;
    alt: string;
    className?: string;
  };
  socialLinks: {
    href: string;
    icon: string;
  }[];
}

export interface Dictionary {
  navigation: {
    home: string;
    sipeChat: string;
    aboutUs: string;
    contact: string;
  };
  theme: {
    theme: string;
    light: string;
    dark: string;
    system: string;
  };
  language: Record<Locale, string>;
  metadata: {
    homePage: {
      title: string;
      description: string;
    };
  };
  notifications: {
    loading: string;
  };
  auth: {
    email: string;
    password: string;
    signup: string;
    signin: string;
    signout: string;
  };
  login: {
    headerLabel: string;
    backButtonLabel: string;
    ariaLabelPasswordToggle: string;
    forgotPassword: string;
    twoFactorConfirmButtonLabel: string;
    orContinueButtonLabel: string;
  };
  registerForm: {
    headerLabel: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: string;
    termsAndConditions: string;
    submit: string;
    alreadyHaveAccount: string;
    login: string;
    successMessage: string;
    errorMessage: string;
  };
  logout: {
    headerLabel: string;
  };
  resetPassword: {
    headerLabel: string;
    resetButtonLabel: string;
    backButtonLabel: string;
    emailLabel: string;
    sendLinkLabel: string;
  };
  validation: {
    emailRequired: string;
    emailInvalidTitle: string;
    emailInvalid: string;
    emailExists: string;
    emailAlreadyLoggedIn: string;
  };
  input: {
    cancelButtonLabel: string;
    saveButtonLabel: string;
    updateButtonLabel: string;
    email: string;
    emailAddress: string;
    emailPlaceholder: string;
  };
  image: {
    imageAlt: string;
    imageError: string;
  };
  userButton: {
    noName: string;
    account: string;
  };
  notFound: {
    title: string;
    description: string;
    returnHome: string;
  };
  profile: {
    account: {
      header: string;
      description: string;
      profile: string;
      name: string;
      nameNotAvailable: string;
      email: string;
      emailButtonConfirm: string;
      emailButtonConfirmation: string;
    };
    subscription: {
      header: string;
      description: string;
      selectHeader: string;
      selectAmount: string;
      selectBuy: string;
    };
    security: {
      header: string;
      description: string;
      twoFactorTitle: string;
      twoFactorTooltip: string;
      twoFactorEnable: string;
      twoFactorDisable: string;
    };
  };
  chatPage: ChatPage;
  chatModal: {
    signIn: string;
    okButton: string;
    createAccount: string;
    clickHere: string;
  };
  hero: {
    heading: string;
    description: string;
    inputPlaceholder: string;
    termsAndConditions: {
      text: string;
      link: string;
    };
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
    testimonials: Testimonials[];
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
  aboutUs: {
    tagline: string;
    heading: string;
    description: string;
    footer: {
      heading: string;
      description: string;
      button: {
        title: string;
      };
    };
    teamMembers: TeamMember[];
  };
  contactForm: {
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    sendingButton: string;
    successToastTitle: string;
    successToastDescription: string;
    errorToastTitle: string;
    errorToastDescription: string;
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
    termsAndConditions: {
      text: string;
      link: string;
    };
    logo: {
      url: string;
      alt: string;
    };
  };
  cookieConsent: {
    message: string;
    manageSettings: string;
    deleteCookies: string;
    acceptAllCookies: string;
    cookieSettings: string;
    cookieSettingsDescription: string;
    readMore: string;
    essential: string;
    alwaysOn: string;
    personalized: string;
    marketing: string;
    analytics: string;
  };

  cookiePolicy: {
    title: string;
    at?: string;
    introduction: string;
    whatAreCookies: {
      title: string;
      description: string;
    };
    typesOfCookies: {
      title: string;
      necessary: string;
      performance: string;
      functional: string;
      advertising: string;
    };
    howWeUseCookies: {
      title: string;
      list: string[];
    };
    managingCookies: {
      title: string;
      description: string;
      learnMore: string;
      browsers: {
        chrome: string;
        firefox: string;
        safari: string;
        edge: string;
      };
    };
    changesToPolicy: {
      title: string;
      description: string;
    };
    contactUs: {
      title: string;
      description: string;
      email: string;
      phone: string;
    };
  };
  terms_modal: {
    title: string;
    welcome: string;
    definitions_title: string;
    definitions_content: string;
    services_title: string;
    services_content: {
      item1: string;
      item2: string;
      item3: string;
    };
    intellectual_property_title: string;
    intellectual_property_content: string;
    privacy_policy_title: string;
    privacy_policy_content: string;
    limitation_liability_title: string;
    limitation_liability_content: string;
    governing_law_title: string;
    governing_law_content: string;
    changes_terms_title: string;
    changes_terms_content: string;
    close_button: string;
  };
  privacyPolicy: {
    title: string;
    lastUpdated: string;
    description: string;
    sections: {
      informationWeCollect: {
        title: string;
        content: string;
        list: string[];
      };
      howWeUseYourInformation: {
        title: string;
        list: string[];
      };
      dataSecurity: {
        title: string;
        content: string;
        note?: string; // Optional
      };
      useOfAI: {
        title: string;
        content: string;
        note?: string; // Optional
      };
      sharingInformation: {
        title: string;
        content: string;
      };
      yourRights: {
        title: string;
        content: string;
      };
      changesToPolicy: {
        title: string;
        content: string;
      };
      contactUs: {
        title: string;
        content: string;
      };
    };
  };
}
