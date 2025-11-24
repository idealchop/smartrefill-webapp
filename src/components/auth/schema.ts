
import { z } from 'zod';
import { STRINGS } from './strings';

export const loginSchema = z.object({
  email: z.string().email({ message: STRINGS.invalidEmail }),
  password: z.string().min(1, { message: STRINGS.passwordRequired }),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, { message: STRINGS.fullNameMinLength }),
  email: z.string().email({ message: STRINGS.invalidEmail }),
  password: z.string().min(6, { message: STRINGS.passwordMinLength }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: STRINGS.passwordsDoNotMatch,
  path: ['confirmPassword'], // a specific field for the error
});

// A combined schema for conditional validation in the form
export const authSchema = z.object({
    isLogin: z.boolean(),
    fullName: z.string().optional(),
    email: z.string().email({ message: STRINGS.invalidEmail }),
    password: z.string().min(1, { message: STRINGS.passwordRequired }),
    confirmPassword: z.string().optional(),
  });
