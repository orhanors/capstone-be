import { Router } from "express";
import { validateToken } from "../../middlewares/auth/validateToken";
import tryCatchWrapper from "../../utils/errors/tryCatchWrapper";
import { validateSeller } from "../../middlewares/auth/validateSeller";
import {
	addNewProduct,
	deleteProduct,
	removeImage,
	updateProduct,
	uploadProductImages,
} from "./product.controller";
import cloudinaryMulter from "../../middlewares/cloudinary/cloudinaryMulter";
import {
	maxProductImageSize,
	productCloudinaryFolder,
	productImageKey,
} from "../../settings/constants";

const productRouter = Router();

productRouter.post(
	"/",
	validateToken,
	validateSeller,
	tryCatchWrapper(addNewProduct)
);
productRouter.post(
	"/upload/images/:productId",
	validateToken,
	validateSeller,
	cloudinaryMulter.array(productImageKey, maxProductImageSize),
	tryCatchWrapper(uploadProductImages)
);

productRouter.delete(
	"/:productId",
	validateToken,
	validateSeller,
	tryCatchWrapper(deleteProduct)
);

productRouter.put(
	"/:productId",
	validateToken,
	validateSeller,
	tryCatchWrapper(updateProduct)
);

//Send { imageId:something } as body
productRouter.delete(
	`/:productId/remove/image/`,
	validateToken,
	validateSeller,
	tryCatchWrapper(removeImage)
);

export default productRouter;
