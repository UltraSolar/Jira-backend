import { IUser } from "../models/user.model";
import { UserDTO } from "../dtos/user.dto";

export function toUserDTO(user: IUser): UserDTO {
    return {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}