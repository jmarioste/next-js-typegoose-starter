import { Todo } from "@/models/Todo";
import { getModelForClass } from "@typegoose/typegoose";

export const TodoModel = getModelForClass(Todo);
// add other models here
