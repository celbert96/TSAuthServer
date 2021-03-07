/**
 * class UserDTO
 *
 * Class UserDTO is used to create a Data Transfer Object for the User class
 *
 * @property    {string}    userName    - The user's username
 * @property    {string}    email       - The user's email
 * @property    {string[]}  roles       - A list of the user's roles. Role names only
 *
 * Example Usage:
 *
 *      const u = new User();
 *      const userDTO = new UserDTO(u);
 */

import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { RoleDTO } from "./RoleDTO";

export class UserDTO {
    userName: string;
    email: string;
    roles: string[];

    /**
     * Create a new UserDTO
     *
     * @param {User} user
     */
    constructor(user: User) {
        this.userName = user.userName;
        this.email = user.email;

        this.roles = [];
        user.roles.map(role => { this.roles.push(role.roleName) });
    }
}
