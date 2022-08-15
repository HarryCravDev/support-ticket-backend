import mongoose from "mongoose";
const noteSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "User is required"],
			ref: "User",
		},
		ticket: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "Ticket is required"],
			ref: "Ticket",
		},
		comment: {
			type: String,
			required: [true, "Please add some text to your comment"],
		},
		username: {
			type: String,
		},
		isStaff: {
			type: Boolean,
			default: false,
		},
		staff: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Note", noteSchema);
