import { Router } from "express";
import { addProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../controllers/product-controller.js";
import { isAdmin } from "../middlewares/admin-middleware.js";

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', isAdmin, addProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

export default router;