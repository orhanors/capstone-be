import { Document } from "mongoose";

export interface IReview extends Document {
	rate: number;
	comment: string;
	product: string;
	user: string;
}
