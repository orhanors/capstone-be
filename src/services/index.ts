import express from "express";
import { authRouter } from "./auth";
import { productRoutes } from "./product";
import { userRoutes } from "./user";
import { cartRoutes } from "./cart";
const services = express.Router();

services.use("/auth", authRouter);
services.use("/users", userRoutes);
services.use("/products", productRoutes);
services.use("/cart", cartRoutes);

export default services;
