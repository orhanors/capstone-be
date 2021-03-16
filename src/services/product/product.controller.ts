import { NextFunction, Request, Response } from "express";
import { Product } from ".";
import { ImageProperties } from "./product.types";
import ApiError from "../../utils/errors/ApiError";
import {
	deleteProductImages,
	deleteSingleImg,
} from "../../utils/products/deleteImages";
import { logger } from "../../utils/logger/winston";

export const uploadProductImages = async (req: Request, res: Response) => {
	const { productId } = req.params;
	const product = await Product.findById(productId);
	if (!product) throw new ApiError(404, "Product not found");
	const images = req.files as ImageProperties[];

	images.map((img) => {
		product?.images.push({ url: img.path, id: img.filename });
	});

	await product?.save();
	res.status(201).send("Ok");
};

export const addNewProduct = async (req: Request, res: Response) => {
	const newProduct = new Product({ ...req.body });
	await newProduct.save();
	res.status(201).send("Ok");
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction | undefined
) => {
	//Deletes product from DB, images from cloudinary
	const { productId } = req.params;

	const product = await Product.findById(productId);

	Promise.all([
		await Product.findByIdAndDelete(productId),
		await deleteProductImages(product),
	])
		.then(() => res.status(200).send("Ok"))
		.catch((e) => {
			next!(new ApiError(500));
		});
};

export const updateProduct = async (req: Request, res: Response) => {
	const { productId } = req.params;
	const updatedProduct = await Product.findByIdAndUpdate(
		productId,
		{ $set: { ...req.body } },
		{ new: true }
	);

	if (!updatedProduct) throw new ApiError(404, "Product not found");
	res.status(200).send("Ok");
};

export const removeImage = async (
	req: Request,
	res: Response,
	next: NextFunction | undefined
) => {
	const { productId } = req.params;
	const { imageId } = req.body;
	Promise.all([
		await deleteSingleImg(imageId),
		await Product.findByIdAndUpdate(productId, {
			$pull: { images: { id: imageId } },
		}),
	])
		.then(() => res.status(200).send("Ok"))
		.catch((e) => next!(new ApiError(500)));
};