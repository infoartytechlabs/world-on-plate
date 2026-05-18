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

    const submission = {
      type: data.type, // sponsor, vendor, musician
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,

      businessName: data.businessName || "",
      title: data.title || "",
      productDetail: data.productDetail || "",
      performerName: data.performerName || "",
      groupMembers: data.groupMembers || "",
      musicStyle: data.musicStyle || "",

      createdAt: new Date(),
      status: "new",
    };

    const collectionName =
      data.type === "sponsor"
        ? "sponsors"
        : data.type === "vendor"
        ? "vendors"
        : "musicians";

    await db.collection(collectionName).insertOne(submission);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Partner form submitted successfully",
      }),
    };
  } catch (error) {
    console.error("submitPartner error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }
}