import HomePage from "@/components/page/home-page";
import { Locale } from "@/i18n.config";

const Home = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;

  const homePage = await HomePage({ lang });
  return homePage;
};

export default Home;
