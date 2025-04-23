import mongoose, { Document, Schema } from "mongoose";

// Define la interfaz para Product extendiendo Document
interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Crea el modelo Product, asegurando que el tipo IProduct esté incluido
const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
