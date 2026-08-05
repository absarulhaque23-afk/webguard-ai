import jwt from 'jsonwebtoken';
import { User, Role } from '../models/User';
import { AppError } from '../middlewares/errorHandler';
import { config } from '../config/environment';

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ id: userId, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

export const register = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  const user = new User({ name, email, password });
  await user.save();

  const token = generateToken(user._id.toString(), user.role);

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken(user._id.toString(), user.role);

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};
