import express from 'express';
import { createProducts, deleteProduct, getPaginatedProducts, getProductById, getProducts, updateProduct } from '../controllers/product-v2.controller';
import asyncHandler from '../helpers/async.handler'; 

const router = express.Router();

router.get(`/`, asyncHandler(getPaginatedProducts));
router.post(`/`, asyncHandler(createProducts));      
router.delete(`/:id`, asyncHandler(deleteProduct)); 
router.get(`/:id`, asyncHandler(getProductById));   
router.put(`/:id`, asyncHandler(updateProduct));    

export default router;
