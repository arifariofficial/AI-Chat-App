import Link from "next/link";

const categories = [
  { name: "Getting Started", slug: "getting-started" },
  { name: "Account Management", slug: "account-management" },
  { name: "Billing", slug: "billing" },
  { name: "Troubleshooting", slug: "troubleshooting" },
];

export default function HelpCenterPage() {
  return (
    <ul className="grid gap-6">
      {categories.map((category) => (
        <li
          key={category.slug}
          className="rounded-md border p-4 hover:shadow-lg"
        >
          <Link href={`/help-center/${category.slug}`}>
            <span className="text-xl font-semibold text-blue-600">
              {category.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
