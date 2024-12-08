// lib/localized-routes.ts

export type LocalizedRoutes = {
  [languageCode: string]: {
    home: string;
    chat: string;
    aboutUs: string;
    contact: string;
    auth: {
      signIn: string;
      signOut: string;
      register: string;
      reset: string; // Optional since it's missing in 'fi' and 'sv'
    };
  };
};

export const localizedRoutes: LocalizedRoutes = {
  en: {
    home: "/",
    chat: "/chat",
    aboutUs: "/about-us",
    contact: "/contact",
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
    auth: {
      signIn: "/kirjautuminen/kirjaudu-sisaan",
      signOut: "/kirjautuminen/kirjaudu-ulos",
      register: "/kirjautuminen/rekisteröidy",
      reset: "/kirjautuminen/palauta",
    },
  },
  sv: {
    home: "/",
    chat: "/chat",
    aboutUs: "/om-oss",
    contact: "/kontakt",
    auth: {
      signIn: "/autentisering/logga-in",
      signOut: "/autentisering/logga-ut",
      register: "/autentisering/registrera",
      reset: "/autentisering/aterstall",
    },
  },
};
