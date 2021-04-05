import { Request, Response, NextFunction } from "express";
import { REFRESH_TOKEN_PATH } from "../../settings/constants";
import { logger } from "../../utils/logger/winston";
const { redirectUrl } = require("../../config/keys");
const handleTokens = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//@ts-ignore
		const { token, refreshToken } = req.user.tokens;
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production" ? true : false,
			sameSite: process.env.NODE_ENV === "production" ? "none" : false,
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			path: REFRESH_TOKEN_PATH,
			secure: process.env.NODE_ENV === "production" ? true : false,
			sameSite: process.env.NODE_ENV === "production" ? "none" : false,
		});
		res.cookie("isAuthUser", true);
		res.redirect(redirectUrl);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

export default handleTokens;
