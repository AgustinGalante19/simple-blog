import { z } from "zod";
import api from ".";
import fullUserSchema from "../lib/validations/fullUserSchema";
import { Post } from "@prisma/client";

export interface PostIdResponse extends Post {
  User: {
    username: string;
    name: string;
    lastname: string;
  };
}

const useCases = {
  auth: {
    signUp: (credentials: z.infer<typeof fullUserSchema>) =>
      api.post<ApiResponse<boolean>>("/auth/signup", credentials),
  },
  posts: {
    create: (
      data: { title: string; content: string; tags: string[] },
      userData: {
        id?: string;
        fullName?: string;
        username?: string;
      }
    ) => api.post("/post/create", { data, userData }),
    getOne: (id: string) => api.get<ApiResponse<PostIdResponse>>(`/post/${id}`),
  },
};

export default useCases;
