import { Router } from 'express';
import * as productosCtrl from './productos.controllers';

const router = Router();

// Rutas para la gestión de productos
router.get('/', productosCtrl.getProductos);
router.post('/', productosCtrl.createProducto); 
router.get('/:id', productosCtrl.getProducto);
router.delete('/:id', productosCtrl.deleteProducto);
router.put('/:id', productosCtrl.updateProducto);

export default router;
