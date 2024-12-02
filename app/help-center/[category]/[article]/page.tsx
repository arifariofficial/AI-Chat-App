import { notFound } from "next/navigation";

const articleContent = {
  "create-account": {
    title: "How to create an account?",
    body: "To create an account, click on the 'Sign Up' button on the top-right corner...",
  },
  "log-in": {
    title: "How to log in?",
    body: "To log in, enter your email and password on the login page...",
  },
  "reset-password": {
    title: "How to reset your password?",
    body: "To reset your password, click on the 'Forgot Password' link on the login page...",
  },
  "update-profile": {
    title: "How to update your profile?",
    body: "To update your profile, go to 'Settings' and modify your information.",
  },
  "view-invoices": {
    title: "How to view invoices?",
    body: "To view invoices, navigate to the 'Billing' section and click on 'Invoices'.",
  },
  "update-payment-methods": {
    title: "How to update payment methods?",
    body: "To update your payment methods, go to 'Billing' > 'Payment Methods' and make the changes.",
  },
  "fix-login-errors": {
    title: "How to fix login errors?",
    body: "If you're experiencing login errors, try resetting your password or clearing your browser cache.",
  },
  "clear-cache": {
    title: "How to clear cache?",
    body: "To clear your cache, go to your browser settings and select 'Clear Browsing Data'.",
  },
} as const;

type ArticleKey = keyof typeof articleContent;

export default async function ArticlePage({
  params,
}: {
  params: { category: string; article: string };
}) {
  const { article } = await params; // Await the params object

  // Validate the article
  if (!articleContent[article as ArticleKey]) {
    return notFound();
  }

  const content = articleContent[article as ArticleKey];

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{content.title}</h1>
      <p className="text-gray-800">{content.body}</p>
    </div>
  );
}
