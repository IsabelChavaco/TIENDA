"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';
// Registro de usuario
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        const newUser = new User_1.User({ username, email, password });
        yield newUser.save();
        res.status(201).json({
            id: String(newUser._id), // Convertimos _id a string
            token: jsonwebtoken_1.default.sign({ id: String(newUser._id), email: newUser.email }, JWT_SECRET, { expiresIn: '1h' }),
            message: 'Usuario registrado exitosamente',
        });
    }
    catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
}));
// Login de usuario
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        res.json({
            id: String(user._id), // Convertimos _id a string
            token: jsonwebtoken_1.default.sign({ id: String(user._id), email: user.email }, JWT_SECRET, { expiresIn: '1h' }),
            message: 'Login exitoso',
        });
    }
    catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}));
exports.default = router;
