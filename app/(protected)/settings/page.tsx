// //for client component
// "use client";

// import { Button } from "@/components/ui/button";
// import { useSession, signOut } from "next-auth/react";

// const SettingsPage = () => {
//   const session = useSession(); //to use this there should be <SessionProvider> in layout.tsx

//   const onClick = () => {
//     signOut();
//   };

//   return (
//     <div>
//       <div>{JSON.stringify(session)}</div>
//       <form>
//         <Button type="submit" onClick={onClick}>
//           Sign Out
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default SettingsPage;

//for server component

import React from "react";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

const SettingsPage = async () => {
  const session = await auth();
  // console.log(session, "jjjjj");

  // session.user.image
  return (
    <div>
      <Header />

      <div>{JSON.stringify(session)}</div>
      <div className="border border-red-500 w-fit m-2">
        isTwoFactorEnabled: {session?.user.isTwoFactorEnabled ? "ON" : "OFF"}
      </div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
