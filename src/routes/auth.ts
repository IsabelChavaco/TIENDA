import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';

// Registro de usuario
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      id: String(newUser._id),  // Convertimos _id a string
      token: jwt.sign({ id: String(newUser._id), email: newUser.email }, JWT_SECRET, { expiresIn: '1h' }),
      message: 'Usuario registrado exitosamente',
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// Login de usuario
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.json({
      id: String(user._id),  // Convertimos _id a string
      token: jwt.sign({ id: String(user._id), email: user.email }, JWT_SECRET, { expiresIn: '1h' }),
      message: 'Login exitoso',
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

export default router;
