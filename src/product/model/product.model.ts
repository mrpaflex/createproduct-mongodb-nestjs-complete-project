import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/model/user.model";

@Schema()
export class Product extends Document{

    @Prop({required: true})
    productName: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    serialNo: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: mongoose.Types.ObjectId;

    @Prop({type: Date, default: Date.now})
    date: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)