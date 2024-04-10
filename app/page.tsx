import MainPageSkeleton from "@skeletons/MainPageSkeleton";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col border h-[calc(100vh-67px)]">
      <Link href="/query">
        <button className="btn-primary">Quick query</button>
      </Link>
      <Link href="/chat">
        <button className="btn-primary">Chat</button>
      </Link>
    </main>
  );
};

export default Home;
