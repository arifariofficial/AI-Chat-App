// lib/localized-routes.ts

export type LocalizedRoutes = {
  [languageCode: string]: {
    home: string;
    chat: string;
    aboutUs: string;
    contact: string;
    account: string;
    subscription: string;
    security: string;
    privacy: string;
    terms: string;
    new: string;
    cookiePolicy: string;
    auth: {
      signIn: string;
      signOut: string;
      register: string;
      reset: string;
    };
  };
};

export const localizedRoutes: LocalizedRoutes = {
  en: {
    home: "/",
    chat: "/chat",
    aboutUs: "/about-us",
    contact: "/contact",
    account: "/account",
    subscription: "/subscription",
    security: "/security",
    privacy: "/privacy",
    terms: "/terms",
    new: "/new",
    cookiePolicy: "/cookie-policy",
    auth: {
      signIn: "/auth/login",
      signOut: "/auth/logout",
      register: "/auth/register",
      reset: "/auth/reset",
    },
  },
  fi: {
    home: "/",
    chat: "/keskustelu",
    aboutUs: "/miesta",
    contact: "/yhteys",
    account: "/tili",
    subscription: "/tilaukset",
    security: "/turvallisuus",
    privacy: "/yksityisyys",
    terms: "/jatkuvat-ehdot",
    new: "/uusi",
    cookiePolicy: "/evastekaytanto",
    auth: {
      signIn: "/kirjautuminen/kirjaudu-sisaan",
      signOut: "/kirjautuminen/kirjaudu-ulos",
      register: "/kirjautuminen/rekisteroidy",
      reset: "/kirjautuminen/palauta",
    },
  },
  sv: {
    home: "/",
    chat: "/chatt",
    aboutUs: "/om-oss",
    contact: "/kontakt",
    account: "/konto",
    subscription: "/prenumeration",
    security: "/sakerhet",
    privacy: "/integritet",
    terms: "/villkor",
    new: "/ny",
    cookiePolicy: "/kakor",
    auth: {
      signIn: "/autentisering/logga-in",
      signOut: "/autentisering/logga-ut",
      register: "/autentisering/registrera",
      reset: "/autentisering/aterstall",
    },
  },
};
