import express from "express";
import path from "path";
import { useRoutes } from "../modules/User/user.routes.js";
import { AdminRoutes } from "../modules/Admin/admin.routes.js";

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
