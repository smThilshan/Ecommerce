import e from 'express';
import {prisma} from '../prisma.js';

export const getAllProducts = async () => {
  return await prisma.product.findMany();
}

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id }
  });
}

export const createProduct = async (data) => {
  return await prisma.product.create({
    data: { title, description, price, stock }
  });
}

export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id },
    data: { title, description, price, stock }
  });
}

export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id }
  });
}