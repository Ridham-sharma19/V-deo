import { error } from "console";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectionToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credential",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email or password is missing ");
        }
        try {
          await ConnectionToDatabase();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("Email or password is missing ");
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("invalid password  ");
          }
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch {
          console.error("Auth Error", error);
          throw error;
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token,user}){
        if(user){
            token.id=user.id;
        }
        return token;
    },
     async session({ session, token}){
        if(session.user){
            session.user.id=token.id as string

        }
        return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return "/dashBoard"
    },
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge:30 * 24 * 60 * 60,
  },
  secret:process.env.NEXTAUTH_SECRET
};
