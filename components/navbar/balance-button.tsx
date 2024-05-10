import { auth } from "@auth";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Link from "next/link";

export default async function Balance() {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href="/profile/balance" className="h-full">
          <Button className="flex h-full flex-row items-center gap-1 bg-inherit px-4 text-inherit shadow-none hover:bg-[#3f6565] focus-visible:ring-0 active:bg-[#2c3e3e]">
            <p>Balance:</p>
            <p className="mr-1">{session?.user.balance}€</p>
          </Button>
        </Link>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
