import { prisma } from "@/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  // @ts-expect-error - ignore adapter error
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session({ session, token }) {
      // @ts-expect-error - ignore user id invalid
      if (session.user) session.user.id = token.id

      return session
    },
    redirect({ url, baseUrl }) {
      const origin = new URL(url).origin
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (
        origin === baseUrl ||
        origin === "site4.app" ||
        origin.endsWith(".vercel.app")
      )
        return url
      return baseUrl
    },
  },
}
