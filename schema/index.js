import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 6 characters long"),
});

export const LocationSchema = z.object({
  name: z.string().trim(),
  address: z.string().trim(),
  location_admin_name: z.string().trim(),
  location_admin_email: z.string().email("Invalid email format"),
  location_admin_password: z.string().trim(),
});
