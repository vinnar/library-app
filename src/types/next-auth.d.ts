import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      name: string
      email: string
      type: "BORROWER" | "ADMIN"
    }
  }

  interface User {
    id: number
    type: "BORROWER" | "ADMIN"
  }
}

