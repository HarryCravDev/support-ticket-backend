import { Types } from "mongoose";
import TicketModel from "../models/Ticket.model";
import ITicket from "../types/ITicket";

class TicketService {
	public async getTickets(): Promise<any> {
		try {
			const tickets = await TicketModel.find({});

			return tickets;
		} catch (error) {
			throw new Error("Error getting tickets.");
		}
	}

	public async createTicket(ticketData: any): Promise<any> {
		try {
			const ticket = await TicketModel.create(ticketData);

			return ticket;
		} catch (error) {
			throw new Error("Error creating a ticket.");
		}
	}
}

export default new TicketService();
