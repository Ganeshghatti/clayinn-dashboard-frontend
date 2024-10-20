import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(10, "Password must not exceed 10 characters"),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/\d/, "Password must contain at least one number")
  // .regex(/[@$!%*#?&]/, "Password must contain at least one special character")
});

export const LocationSchema = z.object({
  name: z.string().trim(),
  address: z.string().trim(),
  location_admin_name: z.string().trim(),
  location_admin_email: z.string().email("Invalid email format"),
  location_admin_password: z.string().trim(),
});
