import { Request } from "express";
import Product from "../models/product.model";

export const createProducts = async (req: Request, res: any) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error:any) {
        res.status(500).json({ success: false, message: error.message });
    }

};

export const getProducts = async (req: Request, res: any) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    }
    catch (error:any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductById = async (req: Request, res: any) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    }
    catch (error:any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req: Request, res: any) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    }
    catch (error:any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct =  async (req: Request, res: any) => {
    const { id } = req.params;
    const product = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (error:any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPaginatedProducts = async (req: Request, res: any) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find().skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                limit,
            },
        });
    }
    catch (error:any) {
        res.status(500).json({ success: false, message: error.message });
    }
};