import express from "express";
import initialSetup from "./startup/middlewares";
import dbConnection from "./startup/db";
import errorHandling from "./middlewares/error/errorHandling";
import { logger } from "./utils/logger/winston";
import ApiError from "./utils/errors/ApiError";
const { port } = require("./config/keys");

require("express-async-errors"); //removes try-catch block needs
const server = express();

initialSetup(server); //Keeps initial middlewares
errorHandling(server);
dbConnection();

server.listen(port, () => {
	if (process.env.NODE_ENV === "production") {
		logger.info("🚀 Server is running on CLOUD on PORT: ", port);
	} else {
		logger.info("🚀 Server is running LOCALLY on PORT: ", port);
	}
});
