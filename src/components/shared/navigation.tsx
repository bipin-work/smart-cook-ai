import NavLinks from "./nav-links";
import type { User } from "next-auth";

const SideNav = ({ user }: { user: User | null }) => {
  return (
    <div className="hidden md:flex h-dvh bg-gray-50">
      <NavLinks user={user} />
    </div>
  );
};

export default SideNav;
