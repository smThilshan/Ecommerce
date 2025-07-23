import { Router } from "express";
import { addProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../controllers/product-controller.js";
import { isAdmin } from "../middlewares/admin-middleware.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/add-product', authMiddleware,isAdmin, addProduct);
router.put('/:id',authMiddleware, isAdmin, updateProduct);
router.delete('/:id',authMiddleware, isAdmin, deleteProduct);

export default router;