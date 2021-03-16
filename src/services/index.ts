import express from "express";
import { authRouter } from "./auth";
import { userRoutes } from "./user";

const services = express.Router();

services.use("/auth", authRouter);
services.use("/users", userRoutes);

export default services;
