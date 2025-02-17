"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import { useAppDispatch } from "@/lib/store/hook";
import { setModel } from "@/lib/store/modelSlice";

const models = [
  {
    value: "gpt-3.5-turbo",
    label: "GPT-3.5 Turbo",
  },
  {
    value: "gpt-4o-mini",
    label: "GPT-4o-mini",
  },

  {
    value: "ft:gpt-4o-mini-2024-07-18:personal::AWZbt8mj",
    label: "GPT-4o-mini FineTuned",
  },
];

interface ModelSelectionProps {
  setShowPromptModal: (value: boolean) => void;
}

export function ModelSelection({ setShowPromptModal }: ModelSelectionProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    "ft:gpt-4o-mini-2024-07-18:personal::AWZbt8mj",
  );

  const dispatch = useAppDispatch();

  const handlePromptModalOpen = () => {
    setShowPromptModal(true);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="m-0 p-0">
        <Button
          variant="outline"
          aria-expanded={open}
          className="flex w-[200px] items-center justify-between border bg-background/30 px-1 font-bold"
          spanClassName="justify-between  w-full flex flex-row "
          iconRight={<ChevronsUpDown className="opacity-50" />}
        >
          {value
            ? models.find((model) => model.value === value)?.label
            : "Select an option"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] border-foreground/40 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? value : currentValue);
                    dispatch(setModel(model.value));
                    setOpen(false);
                  }}
                >
                  {model.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === model.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
              <Separator className="my-1 bg-foreground/30 font-bold shadow" />
              <CommandItem asChild>
                <Button
                  variant="inherit"
                  className="w-full font-semibold"
                  onClick={handlePromptModalOpen}
                >
                  Edit Prompt
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
