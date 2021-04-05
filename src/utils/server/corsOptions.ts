const { redirectUrl } = require("../../config/keys");
const whitelist = [redirectUrl, "http://localhost:3000"];
const corsOptions = {
	origin: (origin: any, callback: any) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true, //Allow cookie
	exposedHeaders: ["set-cookie"],
};

export { corsOptions };
