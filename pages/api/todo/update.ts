import type { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../../../db/getDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await getDB();
    const { todo } = req.body;
    delete todo._id;
    await db
      .collection("todos")
      .updateOne({ id: todo.id }, { $set: { ...todo } });
    res.status(200).send({ success: true, todo });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
}
