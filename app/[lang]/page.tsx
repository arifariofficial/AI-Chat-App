import HomePage from "@/components/home-page/home-page";
import { i18n, Locale } from "@/i18n.config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const Home = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;

  const homePage = await HomePage({ lang });
  return homePage;
};

export default Home;
