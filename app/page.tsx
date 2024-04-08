import MainPageSkeleton from "@skeletons/MainPageSkeleton";
import Link from "next/link";
import { Suspense } from "react";

const Home = () => {
  return (
    <Suspense fallback={<MainPageSkeleton />}>
      <main>
        <Link href="/query">
          <button className="btn-primary">Quick query</button>
        </Link>
        <Link href="/chat">
          <button className="btn-primary">Chat</button>
        </Link>
      </main>
    </Suspense>
  );
};

export default Home;
