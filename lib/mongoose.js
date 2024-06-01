import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // prevents unknown field queries

  if (!process.env.MONGODB_URI) return console.log("MONGO_URI is not set");
  if (isConnected) {
    console.log("Already connected to MONGODB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Chirp",
    });

    isConnected = true;
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log("Couldn't connect to MONGODB:", error.message);
    // return new Error("Couldn't connect to MONGODB", error.message);
  }
};
