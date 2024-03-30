import Link from "next/link";

const Home = () => {
  return (
    <main className="grid h-screen place-content-center gap-3">
      <Link href="/query">
        <button>Quick query</button>
      </Link>
      <Link href="/agent">
        <button>Agent</button>
      </Link>
    </main>
  );
};

export default Home;
