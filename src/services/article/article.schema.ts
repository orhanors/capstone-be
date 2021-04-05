import { model, Model, Schema } from "mongoose";
import { IArticle } from "./article.types.d";

const ArticleSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: "User" },
	title: { type: String, max: 300, min: 3 },
	content: { type: String },
	tags: [{ type: String }],
});

const Article = model<IArticle>("Article", ArticleSchema);

export default Article;
