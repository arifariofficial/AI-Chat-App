"use client";

import { Button } from "@/components/ui/button";
import LoginIcon from "@mui/icons-material/Login";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/lib/types";

interface SignInButtonMobileProps {
  className?: string;
  spanClassName?: string;
  dictionary: Dictionary;
}

const SignInButtonMobile = ({
  className,
  spanClassName,
  dictionary,
}: SignInButtonMobileProps) => {
  return (
    <Button
      asChild
      variant="navMobile"
      className={cn(className)}
      spanClassName={spanClassName}
      iconRight={<LoginIcon />}
    >
      <p className="text-2xl font-bold">{dictionary.auth.signin}</p>
    </Button>
  );
};

export default SignInButtonMobile;
