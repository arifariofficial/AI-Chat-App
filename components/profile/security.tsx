"use client";
import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { twoFactor } from "@/actions/two-factor";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { GiInfo } from "react-icons/gi";
import { IconSpinner } from "@/components/ui/icons";

export default function Security() {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.isTwoFactorEnabled !== undefined) {
      setIsTwoFactorEnabled(session.user.isTwoFactorEnabled);
      setLoading(false);
    }
  }, [session?.user.isTwoFactorEnabled]);

  const handleToggleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newStatus = event.target.checked;

    if (session) {
      const userId = session.user.id;

      try {
        setIsTwoFactorEnabled(newStatus);

        await twoFactor(userId, newStatus);
      } catch (error) {
        console.error(
          "Failed to update two-factor authentication settings:",
          error,
        );
        setError("Failed to update two-factor authentication settings.");
        setIsTwoFactorEnabled(!newStatus);
      }
    }
  };

  return (
    <main className="flex size-full flex-col text-foreground">
      <div className="mb-10 h-fit w-full">
        <h1 className="mb-1 text-2xl font-semibold">Turvallisuus</h1>
        <p>Hallitse turvallisuusasetuksiasi</p>
      </div>
      {error && <div className="mb-2 text-destructive-foreground">{error}</div>}
      <form onSubmit={(e) => e.preventDefault()} className="flex w-full">
        <section className="flex w-full justify-between">
          <div className="flex flex-row text-base font-semibold text-foreground">
            Kaksivaiheinen todennus
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="ml-1 size-4 p-0">
                  <GiInfo />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="shadow-md">
                <p className="max-w-[200px]">
                  Kun tämä ominaisuus on aktivoitu, kertakäyttöinen salasana
                  (OTP) lähetetään käyttäjän sähköpostiosoitteeseen turvallisen
                  kirjautumisen mahdollistamiseksi.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={isTwoFactorEnabled}
                onChange={handleToggleChange}
                disabled={loading}
                name="two-factor"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label={
              <div className="-mr-6 text-sm">
                {isTwoFactorEnabled ? (
                  loading ? (
                    <IconSpinner />
                  ) : (
                    "Otettu käyttöön"
                  )
                ) : (
                  "Poistettu käytöstä"
                )}
              </div>
            }
          />
        </section>
      </form>
    </main>
  );
}
