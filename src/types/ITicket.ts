import mongoose from "mongoose";

export default interface ITicket {
	id: mongoose.Types.ObjectId | string;
	user: mongoose.Types.ObjectId | string;
	product: "iPhone" | "MacBook Air" | "iPad" | "MacBook Pro";
	description: string;
	status: "open" | "In Progress" | "closed";
}
