import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class Todo {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  title: string;

  @prop()
  description: string;

  @prop({ default: false })
  completed: boolean;

  @prop({ default: () => new Date() })
  createdAt: Date;
}
