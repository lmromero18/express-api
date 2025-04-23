import { Request, Response } from "express";
import { crudController } from "./crud.controller";
import Product from "../models/product-v2.model";  // Modelo de producto

export const createProducts = async (req: Request, res: Response): Promise<Response> => {
    const product = req.body;

    // Validación de los campos necesarios
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    return crudController.create(Product, req, res);
};

export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    return crudController.getAll(Product, req, res);
};

export const getProductById = async (req: Request, res: Response): Promise<Response> => {
    return crudController.getById(Product, req, res);
};

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    return crudController.delete(Product, req, res);
};

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    return crudController.update(Product, req, res);
};

export const getPaginatedProducts = async (req: Request, res: Response): Promise<Response> => {
    return crudController.getPaginated(Product, req, res);
};
