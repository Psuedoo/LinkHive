import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      admin: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    admin: boolean;
    // ...other properties
    // role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    admin: boolean;
    // ...other properties
    // role: UserRole;
  }
}
