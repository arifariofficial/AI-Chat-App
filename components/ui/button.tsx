import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary/90 text-foreground shadow hover:bg-primary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border/30 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-background",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-background hover:text-accent-foreground active:bg-backgroundSecondary active:text-background focus:bg-background focus:outline-none focus-visible:border-none focus-visible:ring-0 bg-background",

        link: "text-primary dark:text-white underline-offset-4 hover:underline",

        nav: "bg-inherit text-foregroundNav hover:bg-primary-hover active:bg-inherit active:text-foregroundNav focus-visible:ring-0 hover:text-foregroundNav",

        navMobile:
          "bg-inherit text-title hover:bg-foreground/5 active:bg-foreground/20 focus-visible:ring-0",

        inherit: "bg-inherit",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="flex items-center">
          {iconLeft && <span className="mr-2">{iconLeft}</span>}
          {props.children}
          {iconRight && <span className="ml-2">{iconRight}</span>}
        </span>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
