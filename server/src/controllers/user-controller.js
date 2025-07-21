import * as userService from '../services/user-service.js';
import { generateToken } from '../utils/jwt.js';

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'User created', id: user.id , username: user.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);
    const token = generateToken(user);
    res.json({ token, message: 'Login successful', userId: user.id });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
