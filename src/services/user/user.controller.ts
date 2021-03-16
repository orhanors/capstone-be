import { Request, Response } from "express";

export const getCurrentUser = async (req: Request, res: Response) => {
	res.status(200).send(req.user);
};
