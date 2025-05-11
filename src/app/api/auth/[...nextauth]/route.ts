import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { CustomPrismaAdapter } from "@/lib/customPrismaAdapter"

const handler = NextAuth({

// Use default OOB adapter
//   adapter: PrismaAdapter(prisma),

//   Using custom adapter that has additional validation baked in
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = parseInt(user.id)
        session.user.type = user.type 
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

