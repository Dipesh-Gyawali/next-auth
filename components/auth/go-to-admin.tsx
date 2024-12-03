"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const GoToAdminPage = () => {
  const router = useRouter();
  return (
    <>
      <Button className="m-2" onClick={() => router.replace("/admin")}>
        Only admin can access
      </Button>
    </>
  );
};
