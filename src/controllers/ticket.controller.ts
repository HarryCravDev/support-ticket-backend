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
import IGenericSuccessResponse from "../types/IGenericSuccessResponse";
import IGenericFailureResponse from "../types/IGenericFailureResponse";
import ticketService from "../services/ticket.service";
import ICreateTicket from "../types/ICreateTicket";
import IUpdateTicket from "../types/IUpdateTicket";

@Route("v1/api/ticket")
export class TicketController extends Controller {
	@Security("jwt")
	@Get()
	public async getTickets(): Promise<
		IGenericSuccessResponse | IGenericFailureResponse
	> {
		try {
			const res = await ticketService.getTickets();

			return {
				success: true,
				message: "Tickets.",
				data: res,
			};
		} catch (error: any) {
			return { success: false, message: error.message };
		}
	}

	@Security("jwt")
	@Get("{ticketId}")
	public async getTicket(
		@Path() ticketId: string,
		@Header() userId: string
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		try {
			const res = await ticketService.getTicket(userId, ticketId);

			return {
				success: true,
				message: `Successfully retrieved ticket ${ticketId}.`,
				data: res,
			};
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			if (error.message.includes("User not found.")) this.setStatus(404);

			return { success: false, message: message };
		}
	}

	@Security("jwt")
	@Get("{userId}")
	public async getTicketsByUserId(
		@Path() userId: string
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		try {
			const res = await ticketService.getTicketsById(userId);

			return {
				success: true,
				message: "Get tickets by user id.",
				data: res,
			};
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			if (error.message.includes("User not found.")) this.setStatus(404);

			return { success: false, message: message };
		}
	}

	@Security("jwt")
	@Post()
	public async createTicket(
		@Body()
		ticketData: ICreateTicket
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		this.setStatus(201);
		try {
			console.log("Create ticket fired");
			const res = await ticketService.createTicket(ticketData);

			return {
				success: true,
				message: "Ticket created.",
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
	@Put("{ticketId}")
	public async updateTicket(
		@Path() ticketId: string,
		@Body() ticketData: IUpdateTicket
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		this.setStatus(201);
		try {
			const res = await ticketService.updateTicket(ticketId, ticketData);

			return {
				success: true,
				message: `Ticket ${ticketId} updated.`,
				data: res,
			};
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			if (error.message.includes("Ticket not found.")) this.setStatus(404);

			if (error.message.includes("You can't update a ticket"))
				this.setStatus(401);

			console.log("Error: ", error);
			return { success: false, message: message };
		}
	}

	// @Security("jwt")
	@Delete("{ticketId}")
	public async removeTicket(
		@Path() ticketId: string,
		@Body() ticketData: { userId: string }
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		this.setStatus(201);
		try {
			await ticketService.removeTicket(ticketId, ticketData);

			return {
				success: true,
				message: `Ticket ${ticketId} removed.`,
			};
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			if (error.message.includes("Ticket not found.")) this.setStatus(404);

			if (error.message.includes("You can't update a ticket"))
				this.setStatus(401);

			console.log("Error: ", error);
			return { success: false, message: message };
		}
	}
}
