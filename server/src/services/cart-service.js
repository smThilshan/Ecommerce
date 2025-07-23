import { prisma } from "../prisma.js";

export const getCart = async (userId) => {
  return await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true } // Include product details
  });
}

export const addToCart = async (userId, productId, quantity = 1) => {

    // Check if item exists in cart, then update or create new
  const existing = await prisma.cartItem.findUnique({
    where: { userId_productId: { userId, productId } }
  });

  if (existing) {
    // Update quantity
    return await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity }
    });
  } else {
    // Create new cart item
    return await prisma.cartItem.create({
      data: { userId, productId, quantity }
    });
  }
};


export const updateCart = async (itemId, userId, quantity) => {
  // First check if item exists and belongs to user
  const existing = await prisma.cartItem.findUnique({
    where: { id: itemId }
  });

  if (!existing || existing.userId !== userId) return null;

  // Update and return updated item
  return await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity }
  });
};


export const deleteCart = async (itemId, userId) => {
  // Check if item exists and belongs to user
  const existing = await prisma.cartItem.findUnique({
    where: { id: itemId, userId }
  });
  if (!existing) return null;

  // Delete item
  return await prisma.cartItem.delete({
    where: { id: itemId }
  });
}

