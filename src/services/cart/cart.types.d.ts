import { Document, ObjectId } from "mongoose";

export interface ICart extends Document {
	user: ObjectId;
	products: ObjectId[];
	total: number;
}
