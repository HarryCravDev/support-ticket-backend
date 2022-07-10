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
		try {
			const user = await UserModel.findById({ _id: id });

			if (!user) {
				throw new Error("User not found.");
			}

			const tickets = await TicketModel.find({ user: user._id });

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
