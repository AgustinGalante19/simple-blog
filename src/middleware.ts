import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    newUser: "/",
    signIn: "/auth/login",
    error: "/error",
  },
})

export const config = { matcher: ["/profile/:id*", "/saved/:id*"] }
