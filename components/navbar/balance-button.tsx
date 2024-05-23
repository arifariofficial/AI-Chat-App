"use client";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Session } from "next-auth";
import Link from "next/link";

interface BalanceProps {
  session: Session | null;
}

export default function Balance({ session }: BalanceProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href="/profile/balance" className="h-full">
          <Button variant="nav" className="h-full">
            <p className="hidden sm:block">Balance:</p>
            <p className="mx-1">{session?.user.balance}€</p>
          </Button>
        </Link>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
