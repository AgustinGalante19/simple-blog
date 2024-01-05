import z from "zod";

const newPostSchema = z.object({
  title: z.string().min(3, {
    message: "The title must have at least 3 characters.",
  }),
  content: z.string().min(10, {
    message: "The content must have at least 10 characters.",
  }),
});

export default newPostSchema;
