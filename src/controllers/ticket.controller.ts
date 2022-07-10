import { Body, Controller, Get, Path, Post, Route, Security } from "tsoa";
import ITicket from "../types/ITicket";
import IGenericSuccessResponse from "../types/IGenericSuccessResponse";
import IGenericFailureResponse from "../types/IGenericFailureResponse";
import ticketService from "../services/ticket.service";

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
			return { success: false, message: error.message };
		}
	}

	@Security("jwt")
	@Post()
	public async createTicket(
		@Body() ticketData: any
	): Promise<IGenericSuccessResponse | IGenericFailureResponse> {
		this.setStatus(201);
		try {
			const res = await ticketService.createTicket(ticketData);

			return {
				success: true,
				message: "Ticket create.",
				data: res,
			};
		} catch (error: any) {
			console.log("Error: ", error);
			return { success: false, message: error.message };
		}
	}
}
