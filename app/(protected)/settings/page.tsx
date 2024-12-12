import React from "react";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <Header userRole={session?.user?.role} />

      <div className="max-w-2xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          User Session Details
        </h2>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md overflow-auto">
          <pre className="text-sm text-gray-600">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <span className="font-medium text-gray-700 ml-2">
            Two-Factor Authentication:
          </span>{" "}
          {session?.user.isTwoFactorEnabled ? (
            <span className="text-green-600 font-bold"> ON</span>
          ) : (
            <span className="text-red-600 font-bold"> OFF</span>
          )}
        </div>

        <form
          className="mt-6"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/auth/login" });
          }}
        >
          <Button className="w-full py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200">
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
