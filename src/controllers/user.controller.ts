import { Body, Controller, Post, Route } from "tsoa";
import userService from "../services/user.service";
import IGenericSuccessResponse from "../types/IGenericSuccessResponse";
import IGenericFailureResponse from "../types/IGenericFailureResponse";
import IUserLogin from "../types/IUserLogin";
import IUserRegister from "../types/IUserRegister";
import { generateToken } from "../authentication/generateToken";

@Route("v1/api/users")
export class UsersController extends Controller {
	@Post("register")
	public async createUser(
		@Body() user: IUserRegister
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		try {
			const res = await userService.createUser(user);
			this.setStatus(201);
			return {
				success: true,
				message: "User created.",
				data: {
					user: res,
					token: generateToken({ id: res._id.toLocaleString() }),
				},
			};
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			// Todo - Add error catches
			if (error.message.includes("User already exists")) {
				this.setStatus(400);
				message = "User already exists.";
			}

			return { success: false, message: error.message };
		}
	}

	@Post("login")
	public async login(
		@Body() user: IUserLogin
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		try {
			this.setStatus(201);
			const res = await userService.login(user);

			return {
				success: true,
				message: "Logged in successful.",
				data: {
					user: { ...res },
					token: generateToken({ id: res._id.toLocaleString() }),
				},
			};
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			if (error.message.includes("User not found")) {
				this.setStatus(400);
				message = "User not found.";
			}

			if (error.message.includes("Incorrect credentials")) {
				this.setStatus(401);
				message = "Incorrect credentials.";
			}

			return { success: false, message: error.message };
		}
	}
}
