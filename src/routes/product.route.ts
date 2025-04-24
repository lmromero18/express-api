import express from 'express';
import { createProducts, deleteProduct, getPaginatedProducts, getProductById, getProducts, updateProduct } from '../controllers/product.controller';
import asyncHandler from '../handlers/async.handler'; 

const router = express.Router();

// Rutas para productos
router
.route('/')
.get(asyncHandler(getPaginatedProducts))
.post(asyncHandler(createProducts));    

router.route('/:id')
.delete(asyncHandler(deleteProduct))
.get(asyncHandler(getProductById))  
.put(asyncHandler(updateProduct));    

export default router;
