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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducto = exports.deleteProducto = exports.getProducto = exports.createProducto = exports.getProductos = void 0;
const productos_1 = require("./productos");
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield productos_1.Producto.find();
        res.json(productos);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProductos = getProductos;
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoFound = yield productos_1.Producto.findOne({ code: req.body.code });
        if (productoFound) {
            res.status(409).json({ message: 'El producto ya existe' }); // Sin return
            return; // Esto sí está bien para cortar la ejecución
        }
        const producto = new productos_1.Producto(req.body);
        const savedProducto = yield producto.save();
        res.status(201).json(savedProducto); // Esto también sin return
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
});
exports.createProducto = createProducto;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoFound = yield productos_1.Producto.findById(req.params.id);
        if (!productoFound) {
            res.status(204).json();
            return;
        }
        res.json(productoFound);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProducto = getProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoFound = yield productos_1.Producto.findByIdAndDelete(req.params.id);
        if (!productoFound) {
            res.status(204).json();
            return;
        }
        res.json(productoFound);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProducto = deleteProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProducto = yield productos_1.Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProducto) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        res.json(updatedProducto);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
});
exports.updateProducto = updateProducto;
