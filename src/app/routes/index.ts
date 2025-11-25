import express from "express";
import { useRoutes } from "../modules/User/user.routes.js";
import { AdminRoutes } from "../modules/Admin/admin.routes.js";
import { AuthRoutes } from "../modules/Auth/Auth.routes.js";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    route: useRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
