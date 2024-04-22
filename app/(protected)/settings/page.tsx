import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div className="m-12 flex flex-col">
      <div className=" flex-wrap break-words">{JSON.stringify(session)}</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button className="m-8">Sign out</Button>
      </form>
    </div>
  );
}
