import TicketModel from "../models/Ticket.model";
import UserModel from "../models/User.model";
import ICreateTicket from "../types/ICreateTicket";
import IUpdateTicket from "../types/IUpdateTicket";

class TicketService {
	public async getTickets(): Promise<any> {
		try {
			const tickets = await TicketModel.find({});

			return tickets;
		} catch (error) {
			throw new Error("Error getting tickets.");
		}
	}

	public async getTicket(userId: string, ticketId: string): Promise<any> {
		const user = await UserModel.findById({ _id: userId });

		if (!user) {
			throw new Error("User not found.");
		}

		// todo - Should this user id be included in the search criteria?
		const ticket = await TicketModel.findOne({ _id: ticketId });

		return ticket;
	}

	public async getTicketsById(id: string): Promise<any> {
		const user = await UserModel.findById({ _id: id });

		if (!user) {
			throw new Error("User not found.");
		}

		const tickets = await TicketModel.find({ user: user._id });

		return tickets;
	}

	public async createTicket(ticketData: ICreateTicket): Promise<any> {
		const user = await UserModel.findById(ticketData.userId);

		if (!user) {
			throw new Error("User not found.");
		}

		const newTicket = {
			user: user._id,
			email: ticketData.email,
			name: ticketData.name,
			product: ticketData.product,
			description: ticketData.description,
		};

		const ticket = await TicketModel.create(newTicket);

		return ticket;
	}

	// Todo - type params
	public async updateTicket(
		ticketId: string,
		ticketData: IUpdateTicket
	): Promise<any> {
		const ticket = await TicketModel.findById(ticketId);

		if (!ticket) {
			throw new Error("Ticket not found.");
		}

		if (ticket.user.toString() !== ticketData.userId) {
			throw new Error("You can't update a ticket that doesn't belong to you.");
		}

		const updateTicket = await TicketModel.findOneAndUpdate(
			{ _id: ticketId },
			ticketData,
			{ new: true }
		);

		return updateTicket;
	}

	public async removeTicket(
		ticketId: string,
		ticketData: { userId: string }
	): Promise<any> {
		const ticket = await TicketModel.findById(ticketId);

		if (!ticket) {
			throw new Error("Ticket not found.");
		}

		if (ticket.user.toString() !== ticketData.userId) {
			throw new Error("You can't update a ticket that doesn't belong to you.");
		}

		try {
			const result = await ticket.remove();
		} catch (error) {
			throw new Error("Error removing ticket.");
		}
	}
}

export default new TicketService();
