import {Schema, model} from 'mongoose';

const productoSchema = new Schema({
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
            validator: (v: string) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v),
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

export const Producto = model('Producto', productoSchema);