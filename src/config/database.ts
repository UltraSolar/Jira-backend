import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const mongoUrl = process.env.MONGO_URI as string;

const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log("Error connecting to MongoDB");
        process.exit(1);
    }
};

export default connectDb;