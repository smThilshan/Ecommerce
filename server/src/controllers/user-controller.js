import * as userService from '../services/user-service.js';
import { generateToken } from '../utils/jwt.js';

// POST - new user
export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'User created', id: user.id , username: user.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - all users
export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - login user
export const login = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);
    const token = generateToken(user);
    res.json({ token, message: 'Login successful', userId: user.id });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

// GET - user by ID
export const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// POST - logout user
export const logoutUser = async (req, res) => {
  // Client should just delete the token
 res.json({ message: 'Logged out successfully' });
};
