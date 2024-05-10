"use client";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { twoFactor } from "@actions/two-factor";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Button } from "@components/ui/button";
import { GiInfo } from "react-icons/gi";
import IconSpinner from "@components/ui/icons";

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
        setError("Failed to update two-factor authentication settings.");
        setIsTwoFactorEnabled(!newStatus);
      }
    }
  };

  return (
    <main>
      <div className="mb-10">
        <h1 className="mb-1 text-2xl font-semibold text-gray-800">Security</h1>
        <p className="text-gray-600">Manage your security settings</p>
      </div>
      {error && <div className="mb-2 text-red-500">{error}</div>}
      <form onSubmit={(e) => e.preventDefault()}>
        <section className="flex justify-between">
          <span className="flex flex-row text-base  font-semibold text-gray-700">
            Two-Factor Authentication
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="ml-1 size-4 p-0">
                    <GiInfo />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="shadow-md">
                  <p className="max-w-44">
                    When this feature is activated, a one-time password (OTP)
                    will be sent to the user&apos;s email address to facilitate
                    secure login.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <FormControlLabel
            control={
              <Switch
                checked={isTwoFactorEnabled}
                onChange={handleToggleChange}
                disabled={loading}
              />
            }
            label={
              <>
                {isTwoFactorEnabled ? (
                  loading ? (
                    <IconSpinner />
                  ) : (
                    "Enabled"
                  )
                ) : (
                  "Disabled"
                )}
              </>
            }
          />
        </section>
      </form>
    </main>
  );
}
