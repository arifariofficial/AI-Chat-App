import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/lib/types";
import { SheetClose } from "@/components/ui/sheet";
interface ThemeNavMobileProps {
  className?: string;
  dictionary?: Dictionary;
}

export function ThemeNavMobile({ className, dictionary }: ThemeNavMobileProps) {
  const { theme, setTheme } = useTheme();
  const isLightMode = theme === "light";
  const isDarkMode = theme === "dark";
  const isSystemMode = theme === "system";

  return (
    <Accordion
      type="single"
      collapsible
      className="rounded-md border border-border/20"
    >
      <AccordionItem value="themeToggle" className="border-none">
        <AccordionTrigger
          className={cn(
            "h-[60px] rounded-md hover:bg-inherit hover:text-foreground hover:no-underline",
            className,
          )}
          hideChevron={true}
        >
          <Button
            asChild
            variant="navMobile"
            iconRight={
              !isLightMode ? (
                <MoonIcon className="size-6" />
              ) : (
                <SunIcon className="size-6" />
              )
            }
            className={cn(
              "flex justify-between border-none px-7 outline-none focus:bg-transparent focus:outline-none focus:ring-0",
              className,
            )}
          >
            <p className="text-2xl font-bold">
              {dictionary?.theme.theme || "Theme"}
            </p>
          </Button>
        </AccordionTrigger>
        <AccordionContent className="border-none">
          <div className="flex flex-col space-y-2 border-t border-border/20 p-4">
            <SheetClose asChild>
              <Button
                variant={isLightMode ? "black" : "outline"}
                onClick={() => setTheme("light")}
              >
                {dictionary?.theme.light || "Light"}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant={isDarkMode ? "black" : "outline"}
                onClick={() => setTheme("dark")}
              >
                {dictionary?.theme.dark || "Dark"}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant={isSystemMode ? "black" : "outline"}
                onClick={() => setTheme("system")}
              >
                {dictionary?.theme.system || "System"}
              </Button>
            </SheetClose>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
