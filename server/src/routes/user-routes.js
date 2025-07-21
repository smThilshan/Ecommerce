import { Router } from "express";
import { createUser, getUsers, login } from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/register", createUser);
router.get("/login", login);
router.get("/", authMiddleware, getUsers);

export default router;
