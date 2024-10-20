import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import Link from "next/link";

interface NavItemsMiddleProps {
  className?: string;
}

const NavItemsMiddle = ({ className }: NavItemsMiddleProps) => {
  return (
    <div className={cn(className, "flex justify-end w-full")}>
      <Link href={`/`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-sm">Etusivu</p>
        </Button>
      </Link>
      <Link href={`/meista`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-sm">Meistä</p>
        </Button>
      </Link>
      <Link href={`/yhteystiedot`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-sm">Yhteystiedot</p>
        </Button>
      </Link>
      <Link href={`/chat`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-sm">SipeAI</p>
        </Button>
      </Link>
    </div>
  );
};
export default NavItemsMiddle;
