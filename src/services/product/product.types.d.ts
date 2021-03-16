import { Document } from "mongoose";

export interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	brand: string;
	quantity: number;
	images: Image[];
}

export interface ImageProperties {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	path: string;
	size: number;
	filename: string;
}

interface Image {
	url: string;
	id: string;
}
