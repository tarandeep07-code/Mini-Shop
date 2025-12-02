import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IOrder extends Document {
  sessionId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    sessionId: { type: String, required: true, unique: true },
    name: String,
    email: String,
    phone: String,
    address: String,
    total: Number,

    items: [
      {
        productId: String,
        productName: String,
        price: Number,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export default models.Order || model<IOrder>("Order", OrderSchema);
