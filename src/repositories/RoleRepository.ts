import {IRoleRepository} from "./IRoleRepository";
import {ApiResponse} from "../models/ApiResponse";
import {getConnection} from "typeorm";
import {Role} from "../models/entities/Role";

export class RoleRepository implements IRoleRepository
{
    async getRoleByID(id: number): Promise<ApiResponse<Role>> {
        const connection = getConnection();
        const roleRepository = connection.getRepository(Role);
        const role = await roleRepository.findOne(id);

        if(role !== undefined)
        {
            return new ApiResponse(200, "Successfully retrieved role with id " + id, role);
        }

        return new ApiResponse(404, "Role with id " + id + " not found");
    }

}