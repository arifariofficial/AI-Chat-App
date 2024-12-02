import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemsMiddleProps {
  className?: string;
}

const NavItemsMiddle = ({ className }: NavItemsMiddleProps) => {
  return (
    <div className={cn(className, "flex w-full justify-center text-lg")}>
      <Link href={`/`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-base font-bold">Home</p>
        </Button>
      </Link>
      <Link href={`/chat`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-base font-bold">SipeChat</p>
        </Button>
      </Link>
      <Link href={`/meista`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-base font-bold">About Us</p>
        </Button>
      </Link>
      <Link href={`/yhteystiedot`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-base font-bold">Contact</p>
        </Button>
      </Link>
    </div>
  );
};
export default NavItemsMiddle;
