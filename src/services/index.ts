import express from "express";
import { authRouter } from "./auth";
import { productRoutes } from "./product";
import { userRoutes } from "./user";

const services = express.Router();

services.use("/auth", authRouter);
services.use("/users", userRoutes);
services.use("/products", productRoutes);

export default services;
