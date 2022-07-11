import TicketModel from "../models/Ticket.model";
import UserModel from "../models/User.model";

class TicketService {
	public async getTickets(): Promise<any> {
		try {
			const tickets = await TicketModel.find({});

			return tickets;
		} catch (error) {
			throw new Error("Error getting tickets.");
		}
	}

	public async getTicketsById(id: string): Promise<any> {
		const user = await UserModel.findById({ _id: id });

		if (!user) {
			throw new Error("User not found.");
		}

		const tickets = await TicketModel.find({ user: user._id });

		return tickets;
	}

	public async createTicket(ticketData: any): Promise<any> {
		const user = await UserModel.findById(ticketData.user);

		if (!user) {
			throw new Error("User not found.");
		}
		const ticket = await TicketModel.create(ticketData);

		return ticket;
	}

	// Todo - type params
	public async updateTicket(ticketId: string, ticketData: any): Promise<any> {
		const ticket = await TicketModel.findById(ticketId);

		if (!ticket) {
			throw new Error("Ticket not found.");
		}

		if (ticket.user.toString() !== ticketData.user) {
			throw new Error("You can't update a ticket that doesn't belong to you.");
		}

		const updateTicket = await TicketModel.findOneAndUpdate(
			{ _id: ticketId },
			ticketData,
			{ new: true }
		);

		console.log({ updateTicket });

		return updateTicket;
	}

	// Todo - type params
	public async removeTicket(ticketId: string, ticketData: any): Promise<any> {
		const ticket = await TicketModel.findById(ticketId);

		if (!ticket) {
			throw new Error("Ticket not found.");
		}

		if (ticket.user.toString() !== ticketData.user) {
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
