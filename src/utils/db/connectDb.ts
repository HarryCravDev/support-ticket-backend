import mongoose from "mongoose";
import config from "config";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.get("db.mongo_url"));
        console.log("MongoDB Connected: " + conn.connection.host);
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

export default connectDB;