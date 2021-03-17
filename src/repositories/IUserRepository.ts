import { ApiResponse } from "../models/ApiResponse";
import {User} from "../models/entities/User";

export interface IUserRepository
{
    registerNewUser(user: User): Promise<ApiResponse<User>>;

    updateExistingUser(userId: string): Promise<ApiResponse<User>>;

    deleteUser(user: User): Promise<ApiResponse<User>>;

    getExistingUser(userId: number): Promise<ApiResponse<User>>;

    getExistingUserByUsername(username: string, includePassword: boolean): Promise<ApiResponse<User>>
}