import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/app/services/users";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user = token.user;
        session.user.admin = token.admin;
        session.user.id = token.uid;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!dbUser) return token;

      token.user = dbUser;
      token.admin = dbUser.admin;
      token.uid = dbUser.id;
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        const user = await prisma.user.findFirst({
          where: {
            name: credentials.username,
          },
        });

        if (user) {
          const isPasswordValid = await verifyPassword(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) return null;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
