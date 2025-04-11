import { RequestHandler } from "express";
import { Producto } from "./productos";

export const getProductos: RequestHandler = async(req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
    }
}

export const createProducto: RequestHandler = async (req, res) => {
    try {
        const productoFound = await Producto.findOne({ code: req.body.code });
        if (productoFound) {
            res.status(409).json({ message: 'El producto ya existe' });  // Sin return
            return;  // Esto sí está bien para cortar la ejecución
        }

        const producto = new Producto(req.body);
        const savedProducto = await producto.save();
        res.status(201).json(savedProducto);  // Esto también sin return
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
};


export const getProducto: RequestHandler = async(req, res) => {
    try {
        const productoFound = await Producto.findById(req.params.id);
        if (!productoFound) {
            res.status(204).json();
            return;
            
        }
        res.json(productoFound);
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteProducto: RequestHandler = async(req, res) => {
    try {
        const productoFound = await Producto.findByIdAndDelete(req.params.id);
        if (!productoFound) {
            res.status(204).json();
            return;
        }
        res.json(productoFound);
    } catch (error) {
        console.log(error);
    }
}

export const updateProducto: RequestHandler = async (req, res) => {
    try {
        const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProducto) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        res.json(updatedProducto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};

