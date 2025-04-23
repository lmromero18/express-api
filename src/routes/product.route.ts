import express from 'express';
import { createProducts, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller';

const router = express.Router();

router.get(`/`, getProducts);
router.post(`/`, createProducts);
router.delete(`/:id`, deleteProduct);
router.get(`/:id`, getProductById);
router.put(`/:id`, updateProduct);

export default router;