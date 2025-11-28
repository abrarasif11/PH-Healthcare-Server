import { z } from "zod";

const createAdmin = z.object({
  password: z.string().min(1, "Password is required"),

  admin: z.object({
    name: z.string().min(1, "Name is required"),

    email: z.string().min(1, "Email is required").email("Invalid email format"),

    contactNumber: z.string().min(1, "Contact Number is required"),
  }),
});

export const userValidation = {
  createAdmin,
};
