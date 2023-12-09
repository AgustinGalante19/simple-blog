import { z } from 'zod';
import api from '.';
import fullUserSchema from '../lib/validations/fullUserSchema';

const useCases = {
  auth: {
    signUp: (credentials: z.infer<typeof fullUserSchema>) =>
      api.post<ApiResponse<boolean>>('/auth/signup', credentials),
  },
};

export default useCases;
