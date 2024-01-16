import { Post, User } from "@prisma/client"

export default interface PostWithUser extends Post {
  User: User
}
