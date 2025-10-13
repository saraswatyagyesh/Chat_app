import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) // connecting with the DB
        console.log("MongoDB connected:", conn.connection.host)
    } catch (error) {
        console.error("Error connecting with MongoDB:", error);
        process.exit(1); // 1 -> Fail, 0 -> Success

    }
};