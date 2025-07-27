import { prisma } from "../prisma.js";

export const placeOrder = async (userId, shippingAddress) => {
  // Step 1: Get all cart items for the user including product info
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true } // Needed to access product price
  });

  // Step 2: If cart is empty, throw an error
  if (cartItems.length === 0) {
    throw new Error('Cart is empty');
  }

  // Step 3: Calculate the total amount for the order
  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  // Step 4: Prepare the order data including orderItems
  const orderData = {
    userId,
    total,
    shippingAddress,
    orderItems: {  // <-- correct field name
    create: cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price
    }))
  }
  };

  // Step 5: Execute both order creation and cart clearing inside a transaction
  const [order] = await prisma.$transaction([
    // Create a new order along with orderItems
    prisma.order.create({
      data: orderData,
      include: { orderItems: true } // Include orderItems in the result
    }),

    // Clear all cart items for the user after placing the order
    prisma.cartItem.deleteMany({ where: { userId } })
  ]);

  // Step 6: Return the created order (with orderItems included)
  return order;
};


export const getUserOrdersService = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getOrderByIdService = async (orderId) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
};


