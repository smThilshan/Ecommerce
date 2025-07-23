import e from 'express';
import * as cartService from '../services/cart-service.js';

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request
    const cartItems = await cartService.getCart(userId);
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get carts' });
  }
}

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const cartItem = await cartService.addToCart(userId, productId, quantity);
    res.status(201).json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
}

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request
    const itemId = parseInt(req.params.itemId);
    const { quantity } = req.body;


    if (!itemId || !quantity) {
      return res.status(400).json({ message: 'Item ID and quantity are required' });
    }

    const updatedItem = await cartService.updateCart(itemId, userId, quantity);
    if (!updatedItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Cart item updated', item: updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update cart item' });
  }
}

export const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request
    const itemId = parseInt(req.params.id)

    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const deletedItem = await cartService.deleteCart(itemId, userId);
    if (!deletedItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Cart item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete cart item' });
  }
}