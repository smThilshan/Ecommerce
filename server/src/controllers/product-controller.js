
import * as productService from '../services/product-service.js';


// GET /api/products - List all products
export const listProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/products/:id - Get product details
export const getProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = await productService.getProductById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/products - Add new product (admin only)
export const addProduct = async (req, res) => {
  const { title, description, price, stock } = req.body;
  try {
    const newProduct = await productService.createProduct({ title, description, price, stock });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid data' });
  }
};

// PUT /api/products/:id - Update product (admin only)
export const updateProduct =  async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, price, stock } = req.body;

  try {
    const updatedProduct = await productService.updateProduct(id, { title, description, price, stock });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') { // Record not found
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(400).json({ message: 'Invalid data' });
    }
  }
};

// DELETE /api/products/:id - Delete product (admin only)
export const deleteProduct =  async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await productService.deleteProduct(id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

