"use client";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { fetchBalance } from "@lib/store/balanceSlice";
import { useAppDispatch, useAppSelector } from "@lib/store/hook";
import Link from "next/link";
import { useEffect } from "react";

export default function Balance() {
  const dispatch = useAppDispatch();

  const balance = useAppSelector((state) => state.balance.balance);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href="/profile/balance" className="h-full">
          <Button variant="nav" className="h-full">
            <p className="hidden sm:block">Balance:</p>
            <p className="mx-1">{balance}€</p>
          </Button>
        </Link>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
