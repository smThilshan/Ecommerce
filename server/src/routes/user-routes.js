import { Router } from "express";
import {
  createUser,
  getCurrentUser,
  getUsers,
  login,
  logoutUser,
} from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/", authMiddleware, getUsers);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;
