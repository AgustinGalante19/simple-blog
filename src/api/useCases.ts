import { z } from "zod";
import api from ".";
import fullUserSchema from "../lib/validations/fullUserSchema";

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
  },
};

export default useCases;
