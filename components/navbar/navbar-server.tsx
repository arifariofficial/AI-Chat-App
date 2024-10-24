// components/navbar/nav-bar-server.tsx
import NavBar from "./nav-bar";
import { auth } from "@/auth";

const NavBarServer = async () => {
  const session = await auth();

  // Handle the case where there is no session
  if (!session) {
    return <NavBar session={null} />;
  }

  return <NavBar session={session} />;
};

export default NavBarServer;
