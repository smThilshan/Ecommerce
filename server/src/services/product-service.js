import e from 'express';
import {prisma} from '../prisma.js';

export const getAllProducts = async () => {
  return await prisma.product.findMany({
     where: { isDeleted: false }, 
  });
}

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id }
  });
}

export const createProduct = async (data) => {
   const { title, description, price, stock } = data; 
  return await prisma.product.create({
    data: { title, description, price, stock }
  });
}

export const updateProduct = async (id, data) => {
  const { title, description, price, stock } = data;
  // Ensure the product exists before updating
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) throw new Error('Product not found');
  return await prisma.product.update({
    where: { id },
    data: { title, description, price, stock }
  });
}

export const deleteProduct = async (id) => {
  return await prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
}