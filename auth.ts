import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    // next auth shows other page to display signin and error, so create path and folder yourself

    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    //events: it is used to add side effects
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    // async signIn({ user }) {
    // //if the email is not verified , donot allow for signin.
    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },

    async signIn({ user, account }) {
      //Allow 0Auth:github without email verification
      if (account?.provider !== "credentials") return true;

      //@ts-ignore
      const existingUser = await getUserById(user.id);

      //Prevent sigin in without email verification
      if (!existingUser?.emailVerified) return false;

      //TODO: Add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        console.log({ twoFactorConfirmation });

        if (!twoFactorConfirmation) return false;

        //Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub; //session ma new field: id haleko , jasma token.sub vanne id haleko
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole; //session ma new field: role haleko, jasma token.role vanne role haleko
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean; //session ma new field: isTwoFactor enable vanne field haleko, jasma token.isTwoFactorEnabled vanne haleko
      }

      // if (session.user) {
      //   session.user.customField = token.customField; //jwt ko token.customField lai liyeko, yo settings page ma display gareko xa
      // }
      return session;
    },

    async jwt({ token }) {
      //user, profile do not use because it is undefined many times.

      // token.customField = "test"; // new field add gareko, token {} ma.

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
