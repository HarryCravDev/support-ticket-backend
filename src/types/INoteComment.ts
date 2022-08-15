export default interface INoteComment {
	userId: string;
	ticketId: string;
	comment: string;
	isStaff?: boolean;
	staff?: string;
}
