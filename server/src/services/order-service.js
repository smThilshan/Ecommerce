
// export const placeOrder = async (userId, items, _totalAmountFromClient) => {
//   // Step 1: Get product prices from DB
//   const productIds = items.map(item => item.productId);
//   const products = await prisma.product.findMany({
//     where: { id: { in: productIds } },
//     select: { id: true, price: true }
//   });

import { prisma } from "../prisma.js";

//   // Step 2: Calculate total
//   let totalAmount = 0;
//   for (const item of items) {
//     const product = products.find(p => p.id === item.productId);
//     if (!product) throw new Error(`Product ID ${item.productId} not found`);
//     totalAmount += product.price * item.quantity;
//   }

//   // Step 3: Create order
//   const order = await prisma.order.create({
//     data: {
//       userId,
//       totalAmount,
//     //   shippingAddress,
//       items: {
//         create: items.map(item => ({
//           productId: item.productId,
//           quantity: item.quantity
//         }))
//       }
//     },
//     include: { items: true }
//   });

//   return order;
// };


export const placeOrder = async (userId, items) => {
  const productIds = items.map(item => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, price: true }
  });

  let total = 0;
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (!product) throw new Error(`Product ID ${item.productId} not found`);
    total += product.price * item.quantity;
  }

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      orderItems: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: products.find(p => p.id === item.productId)?.price || 0
        }))
      }
    },
    include: { orderItems: true }
  });

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


