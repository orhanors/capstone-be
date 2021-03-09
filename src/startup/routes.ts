import express from "express";

const services = express.Router();

services.use("/auth");

export default services;
