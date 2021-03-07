/**
 * class RoleDTO
 *
 * Class RoleDTO is used to create a Data Transfer Object for the Role class
 *
 * @property    {string}    roleName    - The name of the role
 * @property    {string}    description - A description of the role
 *
 * Example Usage:
 *
 *      const r = new Role();
 *      const roleDTO = new RoleDTO(r);
 */

import { Role } from "../entities/Role";

export class RoleDTO {
    roleName: string;
    description: string;

    /**
     * Create a new RoleDTO object
     *
     * @param {Role} role
     */
    constructor(role: Role) {
        this.roleName = role.roleName;
        this.description = role.description;
    }
}