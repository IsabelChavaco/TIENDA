"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const mongoose_1 = require("mongoose");
const productoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Evita precios negativos
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v),
            message: 'La URL de la imagen no es válida'
        }
    },
    code: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false // Evita que Mongoose agregue "__v"
});
exports.Producto = (0, mongoose_1.model)('Producto', productoSchema);
