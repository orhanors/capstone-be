import express from "express";
import { authRouter } from "./auth";

const services = express.Router();

services.use("/auth", authRouter);

export default services;
