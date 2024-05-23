import Link from "next/link";
import { Button } from "@components/ui/button";

const Home = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1">
      <Link href="/query" passHref>
        <Button variant="outline" className="w-[300px]">
          Quick query
        </Button>
      </Link>

      <Link href="/chat" passHref>
        <Button variant="outline" className="w-[300px]">
          Chat
        </Button>
      </Link>
    </div>
  );
};

export default Home;
