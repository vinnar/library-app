// lib/customPrismaAdapter.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

export const CustomPrismaAdapter = (prisma: PrismaClient) => {
  const baseAdapter = PrismaAdapter(prisma)

  return {
    ...baseAdapter,
    async createUser(user) {
      // ✅ Example validation: only allow company emails
    //   if (!user.email || !user.email.endsWith("@example.com")) {
      if (!user.email || !user.email.match("vinnar@gmail.com")) {
        throw new Error("Email must be from example.com domain")
      }

      // ✅ You can also normalize or enrich the user object
      user.name = user.name?.trim() || "Anonymous"

      return baseAdapter.createUser(user)
    }
  }
}
