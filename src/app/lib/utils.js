import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


const connection = {};

/**
 * Connects to the database.
 * returns {Promise<void>} A promise that resolves when the connection is established.
 * throws {Error} If there is an error connecting to the database.
 */
export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
