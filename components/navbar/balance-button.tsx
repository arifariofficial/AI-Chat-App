"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconSpinner } from "@/components/ui/icons";
import { fetchBalance } from "@/lib/store/balanceSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BalanceButtonProps {
  session: Session | null;
  className?: string;
}

export default function Balance({ session, className }: BalanceButtonProps) {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.balance.balance);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user.id) {
      dispatch(fetchBalance(session.user.id))
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Failed to fetch balance:", error);
          setLoading(false);
        });
    } else {
      console.log("Session or User ID is undefined, cannot fetch balance.");
      setLoading(false);
    }
  }, [dispatch, session?.user.id]);

  if (loading) {
    return (
      <Button variant="nav" className="h-full">
        <p className="hidden sm:block">Balance: </p>
        <IconSpinner />
      </Button>
    );
  }

  return (
    <div className={className}>
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
    </div>
  );
}
