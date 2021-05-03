import { ApiResponse } from "../models/ApiResponse";
import {User} from "../models/entities/User";

export interface IUserRepository
{
    registerNewUser(user: User): Promise<ApiResponse<User>>;

    updateExistingUser(user: User): Promise<ApiResponse<User>>;

    deleteUser(user: User): Promise<ApiResponse<User>>;

    getExistingUser(userId: number, includePassword: boolean): Promise<ApiResponse<User>>;

    getExistingUserByUsername(username: string, includePassword: boolean): Promise<ApiResponse<User>>
}