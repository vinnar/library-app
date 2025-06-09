// lib/customPrismaAdapter.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, User } from "@prisma/client"
import { env } from "process";

export const CustomPrismaAdapter = (prisma: PrismaClient) => {
  const baseAdapter = PrismaAdapter(prisma)

  return {
    ...baseAdapter,
    async createUser(user: User) {
      // ✅ Example validation: only allow company emails
    //   if (!user.email || !user.email.endsWith("@example.com")) {
      const allowedEmailPattern = env.ALLOWED_EMAIL_LIST
        ? new RegExp(env.ALLOWED_EMAIL_LIST)
        : null;

      if (!user.email || !allowedEmailPattern || !allowedEmailPattern.test(user.email)) {
        throw new Error("Email must match the pre-defined list")
      }

      // ✅ You can also normalize or enrich the user object
      user.name = user.name?.trim() || "Anonymous"

      return baseAdapter.createUser(user)
    }
  }
}
