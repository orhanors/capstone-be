import express, { Application } from "express";
import passport from "passport";
const cors = require("cors");
const cookieParser = require("cookie-parser");

const initialSetup = (server: Application) => {
	server.use(express.json());
	server.use(cors());
	server.use(passport.initialize());
	server.use(cookieParser());
};

export default initialSetup;
