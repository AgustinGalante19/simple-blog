import { z } from "zod"
import api from "."
import fullUserSchema from "../lib/validations/fullUserSchema"
import { Post, SavedPost } from "@prisma/client"

export interface PostIdResponse extends Post {
  User: {
    username: string
    name: string
    lastname: string
  }
}

const useCases = {
  auth: {
    signUp: (credentials: z.infer<typeof fullUserSchema>) =>
      api.post<ApiResponse<boolean>>("/auth/signup", credentials),
  },
  posts: {
    create: (
      data: {
        title: string
        content: string
        tags: string[]
        headerImage?: string
      },
      userData: {
        id?: string
        fullName?: string
        username?: string
      }
    ) => api.post("/post/create", { data, userData }),
    getOne: (id: string) => api.get<ApiResponse<PostIdResponse>>(`/post/${id}`),
    saved: () => api.get<ApiResponse<SavedPost>>("/post/saved"),
    savePost: (userId: string, postId: string) =>
      api.post<ApiResponse<boolean>>("/post/saved", {
        userId,
        postId,
      }),
    removeFromSaved: (userId: string, postId: string) =>
      api.delete<ApiResponse<boolean>>("/post/saved", {
        params: {
          userId,
          postId,
        },
      }),
  },
}

export default useCases
