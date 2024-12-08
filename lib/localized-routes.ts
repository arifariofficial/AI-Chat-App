// lib/localized-routes.ts

export const localizedRoutes = {
  en: {
    home: "/",
    chat: "/chat",
    aboutUs: "/about-us",
    contact: "/contact",
    auth: {
      signIn: "/auth/login",
      signOut: "/auth/logout",
      register: "/auth/register",
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
    },
  },
};
