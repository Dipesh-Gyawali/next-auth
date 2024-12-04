import { auth } from "@/auth";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/ui/form-success";
import { ProtectedRouteForAdmin } from "@/ProtectedRoute";
import { UserRole } from "@prisma/client";

const AdminPage = async () => {
  const session = await auth();
  return (
    <>
      <ProtectedRouteForAdmin userRole={session?.user?.role}>
        <div>Current role: {session?.user.role}</div>;
        <div>
          <RoleGate allowedRole={UserRole.ADMIN}>
            <FormSuccess message="You are allowed to see this content" />
          </RoleGate>
        </div>
      </ProtectedRouteForAdmin>
    </>
  );
};

export default AdminPage;
