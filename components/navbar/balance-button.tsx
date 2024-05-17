"use client";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Balance() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href="/profile/balance" className="h-full">
          <Button variant="nav" className="h-full">
            <p>Balance:</p>
            <p className="mx-1">{session?.user.balance}€</p>
          </Button>
        </Link>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
