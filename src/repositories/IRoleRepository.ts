import {ApiResponse} from "../models/ApiResponse";
import {Role} from "../models/entities/Role";

export interface IRoleRepository
{
    getRoleByID(id: number): Promise<ApiResponse<Role>>;
}