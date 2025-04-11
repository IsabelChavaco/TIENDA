import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  const newUser = new User({ username, email, password });
  await newUser.save();

  res.status(201).json({
    id: (newUser._id as unknown as string),   // Convertimos el ObjectId a string
    username: newUser.username,
    email: newUser.email,
    token: generateToken((newUser._id as unknown as string)), 
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }) as IUser;
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({
    id: (user._id as unknown as string),  // Convertimos el ObjectId a string
    username: user.username,
    email: user.email,
    token: generateToken((user._id as unknown as string)),
  });
};
