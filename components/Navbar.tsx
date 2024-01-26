"use client";

import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={`/`} className="flex gap-2 flex-center">
        <p className="logo_text">SIPE</p>
      </Link>
    </nav>
  );
};

export default Nav;
