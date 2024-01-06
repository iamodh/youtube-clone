import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const mongooseConnection = mongoose.connection;

mongooseConnection.on("connected", () => console.log("Connected to DB"));
mongooseConnection.on("error", (error) => console.log("DB error", error));
