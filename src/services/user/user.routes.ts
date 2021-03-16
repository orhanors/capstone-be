import express from "express";
import { validateToken } from "../../middlewares/auth/validateToken";
import tryCatchWrapper from "../../utils/errors/tryCatchWrapper";
import { getCurrentUser } from "./user.controller";

const userRouter = express.Router();

userRouter.get("/me", validateToken, tryCatchWrapper(getCurrentUser));

export default userRouter;
