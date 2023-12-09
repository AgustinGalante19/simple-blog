import z from 'zod';

const fullUserSchema = z.object({
  name: z.string().min(2, {
    message: 'The name must have at least 2 characters',
  }),
  lastname: z.string().min(3, {
    message: 'The lastname must have at least 3 characters',
  }),

  username: z.string().min(6, {
    message: 'The username must have at least 6 characters',
  }),
  password: z
    .string()
    .min(8, {
      message: 'The password must have at least 8 characters',
    })
    .max(80),
  repeatPassword: z.string().min(8),
});

export default fullUserSchema;
