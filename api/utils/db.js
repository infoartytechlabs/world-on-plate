import { MongoClient } from "mongodb";

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient.db("world_on_plate");
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  cachedClient = client;

  return client.db("world_on_plate");
}