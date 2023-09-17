import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/app/services/users";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user = token.user;
        session.user.id = token.uid;
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
        token.uid = user.id;
      }
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
