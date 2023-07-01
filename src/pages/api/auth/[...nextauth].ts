import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "~/server/auth";



export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
      ]
  }


export default NextAuth(authOptions);
