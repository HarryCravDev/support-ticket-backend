import TicketModel from "../models/Ticket.model";
import UserModel from "../models/User.model";
import NoteModel from "../models/Note.model";
import INoteComment from "../types/INoteComment";

class NoteService {
	public async getNotes(ticketId: string, userId: string): Promise<any> {
		try {
			/* const user = await UserModel.findById(userId);

			if (!user) {
				throw new Error("User not found.");
			}

			const ticket = await TicketModel.findById(ticketId);

			if (ticket?.user.toString() !== userId) {
				throw new Error("User not authorized.");
			} */

			const comments = await NoteModel.find({ ticket: ticketId });

			return comments;
		} catch (error) {
			throw new Error("Error getting ticket comments.");
		}
	}

	public async createNote(noteData: INoteComment): Promise<any> {
		try {
			const user = await UserModel.findById(noteData.userId);

			console.log("Create note user: ", user);

			if (!user) {
				throw new Error("User not found.");
			}

			const ticket = await TicketModel.findById(noteData.ticketId);

			// if (ticket?.user.toString() !== noteData.userId) {
			// 	throw new Error("User not authorized.");
			// }

			await NoteModel.create({
				user: noteData.userId,
				ticket: noteData.ticketId,
				comment: noteData.comment,
				username: user.name,
			});

			const comments = await NoteModel.find({ ticket: noteData.ticketId });

			return comments;
		} catch (error) {
			console.log("Error: ", error);
			throw new Error("Error creating ticket comment.");
		}
	}

	// public async removeNote(
	// 	ticketId: string,
	// 	ticketData: { userId: string }
	// ): Promise<any> {
	// 	const ticket = await TicketModel.findById(ticketId);

	// 	if (!ticket) {
	// 		throw new Error("Ticket not found.");
	// 	}

	// 	if (ticket.user.toString() !== ticketData.userId) {
	// 		throw new Error("You can't update a ticket that doesn't belong to you.");
	// 	}

	// 	try {
	// 		const result = await ticket.remove();
	// 	} catch (error) {
	// 		throw new Error("Error removing ticket.");
	// 	}
	// }
}

export default new NoteService();
