import { Model, Schema, model } from "mongoose";
import { ICart } from "./cart.types.d";

const CartSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
		total: { type: Number },
	},
	{ timestamps: true }
);

const Cart: Model<ICart> = model<ICart>("Cart", CartSchema);

export default Cart;
