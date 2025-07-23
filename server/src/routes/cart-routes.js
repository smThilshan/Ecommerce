import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { addToCart, deleteCart, getCart, updateCartItem } from "../controllers/cart-controller.js";

const router = Router();

router.get('/', authMiddleware, getCart);
router.post('/add',authMiddleware, addToCart);
router.put('/:itemId', authMiddleware, updateCartItem);
router.delete('/:id',authMiddleware, deleteCart);

export default router;