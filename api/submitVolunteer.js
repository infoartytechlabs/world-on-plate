import { connectToDatabase } from "./utils/db.js";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    const db = await connectToDatabase();

    const volunteer = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      role: data.role,
      notes: data.notes,
      createdAt: new Date(),
    };

    await db.collection("volunteers").insertOne(volunteer);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Volunteer submitted successfully",
      }),
    };
  } catch (error) {
  console.error("submitVolunteer error:", error);

  return {
    statusCode: 500,
    body: JSON.stringify({
      success: false,
      message: error.message,
      }),
    };
  }
}