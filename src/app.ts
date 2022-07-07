import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import helmet from "helmet";
import compression from "compression";
import { ValidateError } from "tsoa";
import config from "config";
import mongoose from "mongoose";

const run = async () => {
	const app = express();

	console.log(config.get("db.mongo_url"));

	try {
		// Use body parser to read sent json payloads
		app.use(
			bodyParser.urlencoded({
				extended: true,
			})
		);

		app.use(bodyParser.json());

		app.use(helmet());

		app.use(compression());

		RegisterRoutes(app);

		// Todo - Tidy this up, add login to it's own module.
		app.use(function errorHandler(
			err: any,
			req: Request,
			res: Response,
			next: NextFunction
		): Response | void {
			console.log("Error here : ", err.message);
			if (err instanceof ValidateError) {
				console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
				return res.status(422).json({
					message: "Validation Failed",
					details: err?.fields,
				});
			}

			if (err instanceof Error) {
				if (err.message.includes("No token provided")) {
					return res.status(401).json({
						success: false,
						message: "Unauthorized, no token provided",
					});
				}

				if (err.message.includes("jwt must be provided")) {
					return res.status(401).json({
						success: false,
						message:
							"JWT must be provided in the Authorization header with the Bearer scheme",
					});
				}
				return res.status(500).json({
					message: "Internal Server Error",
				});
			}

			next();
		});

		const conn = await mongoose.connect(config.get("db.mongo_url"));
		console.log(`Connected to MongoDB: ${conn.connection.host} 🥳`);
	} catch (error) {
		console.log("Process exited with error: ", error);
		process.exit(1);
	}

	const port = process.env.PORT || 4500;

	app.listen(port, () =>
		console.log(`Example app listening at http://localhost:${port}`)
	);
};

run();
