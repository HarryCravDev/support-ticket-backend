import users from "../data/Users";
import tickets from "../data/Tickets";
import UserModel from "../../models/User.model";
import TicketModel from "../../models/Ticket.model";
import connectDB from "../../utils/db/connectDb";

connectDB();

const importData = async () => {
  try {
    await UserModel.deleteMany();
    await TicketModel.deleteMany();

    await UserModel.insertMany(users);

    await TicketModel.insertMany(tickets);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error occurred when importing data: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await UserModel.deleteMany();
    await TicketModel.deleteMany();

    console.log("Data Deleted!");
    process.exit();
  } catch (error) {
    console.error(`Error occurred when deleting data: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
