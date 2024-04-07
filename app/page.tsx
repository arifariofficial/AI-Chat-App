import MainPageSkeleton from "@skeletons/MainPageSkeleton";
import Link from "next/link";
import { Suspense } from "react";

const Home = () => {
  return (
    <Suspense fallback={<MainPageSkeleton />}>
      <main>
        <Link href="/query">
          <button>Quick query</button>
        </Link>
        <Link href="/chat">
          <button>Chat</button>
        </Link>
      </main>
    </Suspense>
  );
};

export default Home;
