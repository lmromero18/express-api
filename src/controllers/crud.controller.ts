import { Request, Response } from "express";
import { Document, Model } from "mongoose";

interface ICrudController {
  create: <T extends Document>(model: Model<T>, req: Request, res: Response) => Promise<Response>;
  getAll: <T extends Document>(model: Model<T>, req: Request, res: Response) => Promise<Response>;
  getById: <T extends Document>(model: Model<T>, req: Request, res: Response) => Promise<Response>;
  update: <T extends Document>(model: Model<T>, req: Request, res: Response) => Promise<Response>;
  delete: <T extends Document>(model: Model<T>, req: Request, res: Response) => Promise<Response>;
  getPaginated: <T extends Document>(model: Model<T>, req: Request, res: Response) => Promise<Response>;
}

export const crudController: ICrudController = {
  // Crear un documento
  create: async (model, req, res) => {
    const entityData = req.body;

    const newEntity = new model(entityData);

    try {
      await newEntity.save();
      return res.status(201).json({ success: true, data: newEntity });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Obtener todos los documentos
  getAll: async (model, req, res) => {
    try {
      const entities = await model.find();
      return res.status(200).json({ success: true, data: entities });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Obtener un documento por ID
  getById: async (model, req, res) => {
    const { id } = req.params;

    try {
      const entity = await model.findById(id);
      if (!entity) {
        return res.status(404).json({ success: false, message: "Entity not found" });
      }
      return res.status(200).json({ success: true, data: entity });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Actualizar un documento por ID
  update: async (model, req, res) => {
    const { id } = req.params;
    const entityData = req.body;

    try {
      const updatedEntity = await model.findByIdAndUpdate(id, entityData, { new: true });
      if (!updatedEntity) {
        return res.status(404).json({ success: false, message: "Entity not found" });
      }
      return res.status(200).json({ success: true, data: updatedEntity });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Eliminar un documento por ID
  delete: async (model, req, res) => {
    const { id } = req.params;

    try {
      const entity = await model.findByIdAndDelete(id);
      if (!entity) {
        return res.status(404).json({ success: false, message: "Entity not found" });
      }
      return res.status(200).json({ success: true, data: entity });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Obtener documentos paginados
  getPaginated: async (model, req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    try {
      const entities = await model.find().skip(skip).limit(limit);
      const totalEntities = await model.countDocuments();
      const totalPages = Math.ceil(totalEntities / limit);

      return res.status(200).json({
        success: true,
        data: entities,
        pagination: {
          totalEntities,
          totalPages,
          currentPage: page,
          limit,
        },
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};
