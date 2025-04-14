import mongoose from "mongoose";

export default async function db() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    const dbUri = process.env.DATABASE;

    if (!dbUri) {
      throw new Error("Please provide a valid database URI");
    }

    await mongoose.connect(dbUri);
    console.log("🟢 Connected to database");
  } catch (error) {
    console.error(error);
  }
}
