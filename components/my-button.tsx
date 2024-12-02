import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
  tooltipText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  spanClassName?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "nav"
    | "navMobile"
    | "inherit";
}

const MyButton: React.FC<MyButtonProps> = ({
  children,
  tooltipText,
  className,
  tooltipPlacement,
  variant,
  iconLeft,
  iconRight,
  spanClassName,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            {...props}
            className={cn(className)}
            iconLeft={iconLeft}
            iconRight={iconRight}
            spanClassName={spanClassName}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={tooltipPlacement} hidden={!tooltipText}>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default MyButton;
