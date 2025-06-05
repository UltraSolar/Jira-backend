// src/models/user.model.ts
import mongoose from 'mongoose';

interface IUser {
  name: string,
  email: string,
  createdAt: Date,
  updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;