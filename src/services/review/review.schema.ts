import { model, Model, Schema } from "mongoose";
import { IReview } from "./review.types.d";

const ReviewSchema = new Schema({
	rate: {
		type: String,
		min: [1, "Rate must be minimun 1"],
		max: [5, "Rate must be maximum 5"],
	},
	comment: { type: String },
	user: { type: Schema.Types.ObjectId, ref: "User" },
	product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const Review: Model<IReview> = model<IReview>("Review", ReviewSchema);

export default Review;
