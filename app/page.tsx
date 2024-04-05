import Link from "next/link";

const Home = () => {
  return (
    <main>
      <Link href="/query">
        <button>Quick query</button>
      </Link>
      <Link href="/chat">
        <button>Chat</button>
      </Link>
    </main>
  );
};

export default Home;
