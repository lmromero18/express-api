import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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

const Product = mongoose.model("Product", productSchema);

export default Product;
