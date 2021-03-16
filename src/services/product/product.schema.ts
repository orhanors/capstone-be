import { Model, model, Schema } from "mongoose";
import { IProduct } from "./product.types.d";

const ProductSchema: Schema = new Schema(
	{
		name: { type: String },
		description: { type: String },
		price: { type: Number },
		brand: { type: String },
		images: [{ url: String, id: String }],
	},
	{ timestamps: true }
);

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;
