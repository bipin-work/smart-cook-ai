import { User } from "lucide-react";
import { useSession } from "next-auth/react";
const UserActions = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 bg-recipe-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-recipe-text-primary truncate tracking-[-0.1504px]">
          {session?.user.name}
        </p>
        <p className="text-xs text-recipe-text-tertiary truncate tracking-[-0.1504px]">
          {session?.user.email}
        </p>
      </div>
    </div>
  );
};

export default UserActions;
