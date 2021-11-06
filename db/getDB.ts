import { MongoClient } from "mongodb";

export async function getDB() {
  const DB_URL = process.env.DB_URL;
  if (!DB_URL) throw new Error("No db url");
  const _db = await MongoClient.connect(DB_URL);
  const DB_NAME = process.env.DB_NAME;
  if (!DB_NAME) throw new Error("No db name");
  return _db.db(DB_NAME);
}
