import { Router } from "express";
import * as orderController from "../controllers/order-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = Router();

router.post('/', authMiddleware, orderController.placeOrder);
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);

export default router;