import { Body, Controller, Get, Post, Route, Security } from "tsoa";
import userService from "../services/user.service";
import IGenericSuccessResponse from "../types/IGenericSuccessResponse";
import IGenericFailureResponse from "../types/IGenericFailureResponse";
import IUser from "../types/IUser";
import IUserLogin from "../types/IUserLogin";
import { generateToken } from "../authentication/generateToken";

@Route("v1/api/users")
export class UsersController extends Controller {
	@Post("register")
	public async createUser(
		@Body() user: IUser
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		try {
			const res = await userService.createUser(user);
			this.setStatus(201);
			return { success: true, message: "User created.", data: res };
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
					...res,
					token: generateToken({ id: res._id.toLocaleString() }),
				},
			};
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;
			console.log("error from harry");

			// Todo - Add error catches
			if (error.message.includes("User already exists")) {
				this.setStatus(400);
				message = "User already exists.";
			}

			return { success: false, message: error.message };
		}
	}

	@Security("jwt")
	@Post("foo")
	public async foo(): Promise<any> {
		return { success: true, message: "Foo" };
	}
}
