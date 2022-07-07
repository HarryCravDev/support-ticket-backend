import IUser from "../types/IUser";
import User from "../models/User.model";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import IUserLogin from "../types/IUserLogin";

interface IUserReturn {
	_id: string | number | Types.ObjectId;
	name: string;
	email: string;
}

class UserService {
	public async createUser(userData: IUser): Promise<IUserReturn> {
		const userExists = await User.findOne({ email: userData.email });

		if (userExists) {
			throw new Error("User already exists");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(userData.password, salt);

		try {
			const user = await User.create({
				name: userData.name,
				email: userData.email.toLowerCase(),
				password: hashedPassword,
			});

			return {
				_id: user._id,
				name: user.name,
				email: user.email,
			};
		} catch (error) {
			throw new Error("Error creating user");
		}
	}

	public async login({ email, password }: IUserLogin): Promise<IUserReturn> {
		try {
			const user = await User.findOne({ email: email.toLowerCase() });

			if (!user) {
				throw new Error("User not found");
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				throw new Error("Incorrect credentials");
			}

			return { _id: user._id, name: user.name, email: user.email };
		} catch (error) {
			throw new Error("Error logging in");
		}
	}
}

export default new UserService();
