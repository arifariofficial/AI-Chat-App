# AI Chatbot Project Documentation

## Project Overview

This project is an AI-powered chatbot built using Next.js, TypeScript, PostgreSQL, Prisma, NextAuth, Docker, and Supabase vector-db. The app integrates with an AI SDK to generate responses, supports translation into three languages, and provides an interactive chat interface. The project is designed to be containerized using Docker for easy deployment and scaling.

### Tech Stack:

- **Frontend**: Next.js (App Router) + TypeScript
- **Backend**: NextAuth for authentication, Prisma ORM with PostgreSQL
- **AI Integration**: AI SDK (for chatbot capabilities), Supabase vector-db (for AI data storage)
- **Containerization**: Docker
- **Translations**: Supports three languages (English, Finnish, Swedish)

## Installation

### Prerequisites

- **Node.js** (version 14 or higher)
- **Docker** (for containerization)
- **PostgreSQL** (local or remote database setup)
- **Supabase account** (for vector-db setup)
- **Stripe** (for payments)

### 1. Clone the Repository

```bash
git clone https://gitlab.com/sipe3/sipe-frontend.git
cd cd sipe-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Get env.development

### 4. Database Setup

Set up the local database using the configuration from the `.env.development` file

Run Prisma migrations to set up the PostgreSQL database schema:

```bash
npx prisma migrate dev
```

### 5. Running Locally

```bash
npm run dev
```

## 🗂️ Project Structure Overview

| Folder/File     | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| `app/`          | Next.js App Router pages (with `[lang]` localization, chat, auth, etc.) |
| `components/`   | Shared UI components (auth forms, about sections, chat UI)              |
| `data/`         | Client-side data layer (API interactions with backend)                  |
| `dictionaries/` | JSON translation files (e.g., `en.json`, `sv.json` `fi.json`)           |
| `lib/`          | Custom React hooks, localization utils, state management                |
| `middlewares/`  | Middlewares for i18n and authentication                                 |
| `prisma/`       | Prisma schema, migrations, and seed script                              |
| `public/`       | Static assets like images, icons                                        |
| `scripts/`      | Data pre-processing and fine-tuning helpers                             |
| `styles/`       | Tailwind + global CSS styles                                            |
| `.env.*`        | Environment configs for local/dev/prod                                  |

---

## 🌐 Internationalized Routing and Page Rendering (App Router)

This project supports multilingual content using the Next.js App Router with localized routing. It includes support for Finnish (`fi`), English (`en`), and Swedish (`sv`).

---

### 📁 Directory Structure Overview

app/
├── [lang]/ # Localized page directories (e.g., /fi/, /en/, /sv/)
│ ├── about-us/ # Example route
│ ├── chat/ # Chat interface
│ ├── contact/ # Contact form
│ ├── ... # More localized routes
│ └── page.tsx # Main localized homepage
├── api/ # API endpoints
├── layout.tsx # Global layout (theme, auth, navbar, localization)
├── favicon.ico
├── global-error.tsx # Error boundary

---

### 🏡 Homepage Rendering (`[lang]/page.tsx`)

The homepage is rendered dynamically per locale.

```ts
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const Home = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const homePage = await HomePage({ lang });
  return homePage;
};

export default Home;
```

### 🧩 HomePage Component (`components/home-page/home-page.tsx`)

This component receives the `lang` parameter and renders the localized sections. It performs the following steps:

- Fetches session via `auth()`
- Loads the localized dictionary using `getDictionary()`
- Retrieves localized route mappings via `localizedRoutes()`
- Passes these props into the home sections

#### Render Structure:

```tsx
return (
  <div className="container mx-auto max-w-screen-2xl">
    <FeatureSection dictionary={dictionary} />
    <FeatureSectionList session={session} dictionary={dictionary} lang={lang} />
    <BenefitSection dictionary={dictionary} />
    <CtaSection dictionary={dictionary} lang={lang} />
    <ContactSection dictionary={dictionary} />
    <Footer dictionary={dictionary} lang={lang} routes={routes} />
  </div>
);
```

### 🌍 Localization Config (`i18n.config.ts`)

Defines the available languages and the default language for the application.

```ts
export const i18n = {
  defaultLocale: "fi",
  locales: ["en", "fi", "sv"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
```

### 📖 Dictionary Loading

All localized text content is loaded using the language parameter (`lang`):

````ts
const dictionary = await getDictionary(lang);

### 🧱 Global Layout (`layout.tsx`)

The global layout is responsible for setting up the overall application shell. It includes the following responsibilities:

- ✅ Session loading using `auth()`
- 💬 Chat fetching for authenticated users
- 🎨 Applying dark/light themes via `Providers`
- 🧭 Rendering the navigation bar
- 🍪 Displaying cookie consent
- 🌍 Wrapping all content with the correct localization

#### Layout Structure:

```tsx
<html lang={lang}>
  <body>
    <Toaster />
    <Providers chats={chats} lang={lang}>
      <SessionProvider session={session}>
        <main>
          {navBar}
          <CookieConsent dictionary={dictionary} routes={routes} />
          {children}
          <ShadToaster />
        </main>
      </SessionProvider>
    </Providers>
  </body>
</html>
````

### 🧾 Metadata Generation

Each page dynamically generates **localized metadata** to support SEO, browser tab titles, and social sharing.  
This ensures the content matches the selected language for a better user experience.

#### Example Implementation:

```ts
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: `SipeAI - ${dictionary.metadata.homePage.title}`,
    description: `${dictionary.metadata.homePage.description}`,
    icons: "/favicon.ico",
  };
}
```
