import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI || "";
const options = {};

if (!uri) {
  throw new Error("❌ Please add your MongoDB connection string to .env as MONGODB_URI");
}

// To avoid creating multiple instances in dev mode (hot reload issue)
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global variable reuse in TypeScript
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
