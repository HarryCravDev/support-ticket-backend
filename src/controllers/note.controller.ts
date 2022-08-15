import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	Path,
	Post,
	Put,
	Route,
	Security,
} from "tsoa";
import ITicket from "../types/ITicket";
import NoteService from "../services/note.service";
import IGenericSuccessResponse from "../types/IGenericSuccessResponse";
import IGenericFailureResponse from "../types/IGenericFailureResponse";
import INoteComment from "../types/INoteComment";

@Route("v1/api/notes")
export class NoteController extends Controller {
	// @Security("jwt")
	@Post("{ticketId}")
	public async addComment(
		@Body()
		noteData: INoteComment
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		this.setStatus(201);
		try {
			console.log("Add comment controller fired: ", noteData);
			const res = await NoteService.createNote(noteData);

			return {
				success: true,
				message: "Ticket comment added.",
				data: res,
			};
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			if (error.message.includes("User not found.")) this.setStatus(404);

			console.log("Error: ", error);
			return { success: false, message: message };
		}
	}

	// @Security("jwt")
	@Get("{userId}/{ticketId}")
	public async getNotes(
		@Path()
		userId: string,
		@Path()
		ticketId: string
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		this.setStatus(201);
		try {
			console.log("Get notes controller fired: ", userId, ticketId);
			const res = await NoteService.getNotes(ticketId, userId);

			return {
				success: true,
				message: "Ticket comments.",
				data: res,
			};
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			if (error.message.includes("User not found.")) this.setStatus(404);

			if (error.message.includes("User not authorized.")) this.setStatus(401);

			console.log("Error: ", error);
			return { success: false, message: message };
		}
	}

	// @Security("jwt")
	// @Delete("{ticketId}")
	// public async removeTicket(
	// 	@Path() ticketId: string,
	// 	@Body() ticketData: { userId: string }
	// ): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
	// 	this.setStatus(201);
	// 	try {
	// 		await ticketService.removeTicket(ticketId, ticketData);

	// 		return {
	// 			success: true,
	// 			message: `Ticket ${ticketId} removed.`,
	// 		};
	// 	} catch (error: any) {
	// 		this.setStatus(500);
	// 		let message = error.message;

	// 		if (error.message.includes("Ticket not found.")) this.setStatus(404);

	// 		if (error.message.includes("You can't update a ticket"))
	// 			this.setStatus(401);

	// 		console.log("Error: ", error);
	// 		return { success: false, message: message };
	// 	}
	// }
}
