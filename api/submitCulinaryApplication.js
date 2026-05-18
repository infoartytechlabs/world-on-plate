import { connectToDatabase } from "./utils/db.js";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: "Method not allowed",
      }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    const db = await connectToDatabase();

    const application = {
      firstName: data.firstName,
      lastName: data.lastName,
      title: data.title,
      institution: data.institution,
      phone: data.phone,
      email: data.email,

      status: "pending",

      createdAt: new Date(),
    };

    await db
      .collection("culinaryApplications")
      .insertOne(application);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Application submitted successfully",
      }),
    };
  } catch (error) {
    console.error("submitCulinaryApplication error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }
}