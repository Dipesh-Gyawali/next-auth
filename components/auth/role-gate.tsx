import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";
import { auth } from "@/auth";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = async ({ children, allowedRole }: RoleGateProps) => {
  const session = await auth();
  const role = session?.user.role;

  if (role !== allowedRole) {
    return (
      <div>
        <FormError message="You do not have permission to view this content!" />
      </div>
    );
  }

  return <>{children}</>;
};
