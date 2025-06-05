import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../enums/role.enum";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>( 
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String},
        avatar: {type: String},
    },
    { timestamps: true }
)

export const UserModel = mongoose.model<IUser>("User", UserSchema);