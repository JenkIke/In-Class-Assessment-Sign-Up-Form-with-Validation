// zod import
import { z } from "zod";

// Sign up rules and format requirements
const baseSchema = z.object({
  // Trim spaces, then require 2-30 characters
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .min(2, "First name must be at least 2 characters.")
    .max(30, "First name must be 30 characters or less."),
  // Same rules as first name
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .min(2, "Last name must be at least 2 characters.")
    .max(30, "Last name must be 30 characters or less."),
  // Trim spaces, then check for a valid email format
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .pipe(z.email("Please enter a valid email address.")),
  // Require at least 8 characters
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters."),
  // Must be filled in; matching is checked below
  confirmPassword: z.string().min(1, "Please confirm your password."),
});

// Both passwords must match; the error shows under confirm password
export const signUpSchema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
    when(payload) {
      return baseSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  },
);

// TypeScript type for the form data, built from the schema
export type SignUpFormData = z.infer<typeof signUpSchema>;
