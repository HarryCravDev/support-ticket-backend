import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
	user: {
		// type: mongoose.Schema.Types.ObjectId,
		type: String,
		required: [true, "User is required"],
		ref: "User",
	},
	product: {
		type: String,
		required: [true, "Product is required"],
		enum: ["iPhone", "MacBook Air", "MacBook Pro", "iPad"],
	},
	description: {
		type: String,
		required: [true, "Description of the issue is required"],
	},
	status: {
		type: String,
		required: [true, "Status is required"],
		enum: ["open", "in progress", "closed"],
		default: "open",
	},
});

export default mongoose.model("Ticket", ticketSchema);
