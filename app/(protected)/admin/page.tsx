import { auth } from "@/auth";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/ui/form-success";
import { UserRole } from "@prisma/client";

const AdminPage = async () => {
  const session = await auth();
  return (
    <>
      <div>Current role: {session?.user.role}</div>;
      <div>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
      </div>
    </>
  );
};

export default AdminPage;
