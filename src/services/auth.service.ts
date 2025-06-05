import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";
import { generateToken } from "../utils/jwt";
import { Role } from "../enums/role.enum";
import { UserRepository } from "../repositories/user.repository";
import { UserDTO } from "../dtos/user.dto";
import { toUserDTO } from "../mappers/user.mapper";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: Role;
  avatar?: string;
}

interface LoginResult {
  token: string;
  user: UserDTO
}

export const AuthService = {
  login: async (email: string, password: string): Promise<LoginResult | null> => {
    const user = await UserRepository.findRawByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const token = generateToken({
      id: user.id.toString(),
      email: user.email
    });

    return {
      token,
      user: toUserDTO(user)
    };
  },

  register: async (input: RegisterInput): Promise<LoginResult | null> => {
    const existing = await UserModel.findOne({ email: input.email }).exec();
    if (existing) return null;

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newUser = new UserModel({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
      avatar: input.avatar
    });

    const savedUser = await newUser.save();

    const token = generateToken({
      id: savedUser.id,
      email: savedUser.email
    });

    return {
      token,
      user: toUserDTO(savedUser)
    };
  }
};
