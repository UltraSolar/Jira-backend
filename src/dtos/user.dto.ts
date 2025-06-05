import { Role } from "../enums/role.enum";

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}