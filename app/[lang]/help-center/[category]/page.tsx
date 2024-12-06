import { notFound } from "next/navigation";
import Link from "next/link";

const articlesByCategory = {
  "getting-started": [
    { title: "How to create an account?", slug: "create-account" },
    { title: "How to log in?", slug: "log-in" },
  ],
  "account-management": [
    { title: "How to reset your password?", slug: "reset-password" },
    { title: "How to update your profile?", slug: "update-profile" },
  ],
  billing: [
    { title: "How to view invoices?", slug: "view-invoices" },
    { title: "How to update payment methods?", slug: "update-payment-methods" },
  ],
  troubleshooting: [
    { title: "How to fix login errors?", slug: "fix-login-errors" },
    { title: "How to clear cache?", slug: "clear-cache" },
  ],
} as const;

type CategoryKey = keyof typeof articlesByCategory;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Validate the category
  if (!Object.keys(articlesByCategory).includes(category)) {
    return notFound();
  }

  const articles = articlesByCategory[category as CategoryKey];

  return (
    <ul className="space-y-4">
      {articles.map((article) => (
        <li
          key={article.slug}
          className="rounded-md border p-4 hover:shadow-lg"
        >
          <Link href={`/help-center/${category}/${article.slug}`}>
            <span className="text-lg text-blue-600">{article.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
