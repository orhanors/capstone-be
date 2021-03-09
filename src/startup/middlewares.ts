import express, { Application } from "express";
import passport from "passport";
import services from "../services/index";
const cors = require("cors");
const cookieParser = require("cookie-parser");

const initialSetup = (server: Application) => {
	server.use(express.json());
	server.use(cors());
	server.use(passport.initialize());
	server.use(cookieParser());
	server.use("/api", services);
};

export default initialSetup;
