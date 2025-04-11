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
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const userExists = yield User_1.User.findOne({ email });
    if (userExists) {
        return res.status(409).json({ message: 'El usuario ya existe' });
    }
    const newUser = new User_1.User({ username, email, password });
    yield newUser.save();
    res.status(201).json({
        id: newUser._id, // Convertimos el ObjectId a string
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id),
    });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.User.findOne({ email });
    if (!user || !(yield user.comparePassword(password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    res.json({
        id: user._id, // Convertimos el ObjectId a string
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
    });
});
exports.loginUser = loginUser;
