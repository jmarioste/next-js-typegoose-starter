import { TodoModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { Todo } from "@/models/Todo";
type UpdateTodoBody = Partial<Todo>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // first connect to the database
  await dbConnect();
  const id = req.query.id as string;
  if (req.method === "GET") {
    // for retrieving a single todo
    const todo = await TodoModel.findById(id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404);
    }
  } else if (req.method === "PUT") {
    // updating a single todo
    const body = req.body as UpdateTodoBody;
    const todo = await TodoModel.findById(id);
    if (todo) {
      todo.set({ ...body });
      await todo.save();
      res.status(200).json(todo.toJSON());
    } else {
      res.status(404);
    }
  } else if (req.method === "DELETE") {
    // deleting a single todo
    const todo = await TodoModel.findByIdAndRemove(id);
    if (todo) {
      res.status(200).json(todo.toJSON());
    } else {
      res.status(404);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
