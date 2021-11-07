import { MongoClient } from "mongodb";

//aws amplify doesn't pick up env variables soo here goes (repo's private anyway)
const DB = {
  url: "mongodb+srv://mungai:Ihc4rIhc4r@askfpl.cdjgt.mongodb.net/todos?retryWrites=true&w=majority",
  name: "todos",
};
console.log(process.env);

export async function getDB() {
  if (!DB.url) throw new Error("No db url");
  const _db = await MongoClient.connect(DB.url);
  if (!DB.name) throw new Error("No db name");
  return _db.db(DB.name);
}
