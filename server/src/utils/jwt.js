import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'server_jwt_secret';

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
