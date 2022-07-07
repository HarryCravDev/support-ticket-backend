import jwt from "jsonwebtoken";
import config from "config";

export const generateToken = (data: any) => {
	return jwt.sign(data, config.get("app.secret"), {
		expiresIn: "2 days",
	});
};
