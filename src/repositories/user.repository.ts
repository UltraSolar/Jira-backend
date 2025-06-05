import { UserDTO } from "../dtos/user.dto";
import { IUser, UserModel } from "../models/user.model";
import { toUserDTO } from "../mappers/user.mapper";

export const UserRepository = {
    async findById(id: string):Promise<UserDTO | null> {
        const user = await UserModel.findById(id).exec();
        if (!user) return null;
        return toUserDTO(user);
    },

    async findByEmail(email: string):Promise<UserDTO | null> {
        const user = await UserModel.findOne({ email }).exec();
        if (!user) return null;
        return toUserDTO(user); // 
    },

    async findRawByEmail (email: string):Promise<IUser | null> {
        const user = await UserModel.findOne({email}).exec();
        return user;
    },

    async create(data: Partial<IUser>):Promise<UserDTO> {
        const createdUser = await UserModel.create(data);
        return toUserDTO(createdUser);
    },

    async delete(id: string):Promise<boolean> {
        const deletedUser = await UserModel.findByIdAndDelete(id).exec();
        return deletedUser !== null;
    }
}