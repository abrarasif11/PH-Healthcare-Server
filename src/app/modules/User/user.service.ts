import { UserRole } from "@prisma/client";

const createAdmin = async (data: any) => {
  const userData = {
    email: data.admin.email,
    password: data.password,
    role: UserRole.ADMIN,
  };
  return {
    message: "Admin Created",
  };
};

export const userService = {
  createAdmin,
};
