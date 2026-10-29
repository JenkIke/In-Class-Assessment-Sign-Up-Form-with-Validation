import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required.")
      .min(2, "First name must be at least 2 characters.")
      .max(30, "First name must be 30 characters or less."),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required.")
      .min(2, "Last name must be at least 2 characters.")
      .max(30, "Last name must be 30 characters or less."),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .pipe(z.email("Please enter a valid email address.")),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
