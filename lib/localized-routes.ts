// lib/localized-routes.ts

export type LocalizedRoutes = {
  [languageCode: string]: {
    home: string;
    chat: string;
    aboutUs: string;
    contact: string;
    account: string;
    balance: string;
    security: string;
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
    balance: "/balance",
    security: "/security",
    auth: {
      signIn: "/auth/login",
      signOut: "/auth/logout",
      register: "/auth/register",
      reset: "/auth/reset",
    },
  },
  fi: {
    home: "/",
    chat: "/chat",
    aboutUs: "/miesta",
    contact: "/yhteys",
    account: "/tili",
    balance: "/saldo",
    security: "/turvallisuus",
    auth: {
      signIn: "/kirjautuminen/kirjaudu-sisaan",
      signOut: "/kirjautuminen/kirjaudu-ulos",
      register: "/kirjautuminen/rekisteroidy",
      reset: "/kirjautuminen/palauta",
    },
  },
  sv: {
    home: "/",
    chat: "/chat",
    aboutUs: "/om-oss",
    contact: "/kontakt",
    account: "/konto",
    balance: "/balans",
    security: "/sakerhet",
    auth: {
      signIn: "/autentisering/logga-in",
      signOut: "/autentisering/logga-ut",
      register: "/autentisering/registrera",
      reset: "/autentisering/aterstall",
    },
  },
};
