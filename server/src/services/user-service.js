import {prisma} from '../prisma.js';
import { hashPassword, comparePassword } from '../utils/hash.js';

export const createUser = async ({ name, email, password }) => {
  const hashed = await hashPassword(password);
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashed
    }
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    }
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  return user;
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
}