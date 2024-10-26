import { UserIcon } from "@/components/ui/icons";

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-full border border-foreground/90 text-foreground/90 shadow-sm">
          <UserIcon className="p-[2px]" fill="currentColor" />
        </div>
        <h1 className="mx-3 -mt-1 text-lg font-semibold text-foreground/90">
          Sinä
        </h1>
      </div>
      <div className="ml-8 flex-1 space-y-2 overflow-hidden pl-2">
        {children}
      </div>
    </div>
  );
}
