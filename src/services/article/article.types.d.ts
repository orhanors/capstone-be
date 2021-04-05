import { Document, ObjectId } from "mongoose";

export interface IArticle extends Document {
	author: ObjectId | string;
	title: string;
	content: string;
	tags: Array<string>;
}
