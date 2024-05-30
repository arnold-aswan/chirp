import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // prevents unknown field queries

  if (!process.env.MONGODB_URI) return console.log("MONGO_URI is not set");
  if (isConnected) return console.log("Already connected to MONGODB");

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log(error);
    return new Error("Couldn't connect to MONGODB", error.message);
  }
};
