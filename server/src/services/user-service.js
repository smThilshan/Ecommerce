import {prisma} from '../prisma.js';

export const createUser = async (data) => {
  return await prisma.user.create({ data });
};

export const getUsers = async () => {
  return await prisma.user.findMany();
};
