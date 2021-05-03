import {UserRepository} from "../repositories/UserRepository";
import {User} from "../models/entities/User";
import {RoleRepository} from "../repositories/RoleRepository";
import {Roles} from "../models/Roles";
import {ApiResponse} from "../models/ApiResponse";
import express from "express";

export class UserController {
    static createNewUser = async(req: express.Request, res: express.Response) => {
        const user = new User();
        user.userName = req.body.userName;
        user.email = req.body.email;
        user.password = req.body.password;

        const userValidationResult = user.validate();

        if(userValidationResult.httpStatus !== 200) {
            return userValidationResult;
        }

        const roleGetResult = await new RoleRepository().getRoleByID(Roles.USER_STANDARD);

        if(roleGetResult.httpStatus !== 200)
        {
            return new ApiResponse(500, 'Internal Error - Could not fetch user roles');
        }

        const userRole = roleGetResult.data;

        // Add roles to user object
        user.roles = [userRole];

        const userAddResult = await new UserRepository().registerNewUser(user);

        return res.status(userAddResult.httpStatus).json(userAddResult);
    }

    static getUserById = async(req: express.Request, res: express.Response) => {
        const userId = Number(req.params.userId);
        if(isNaN(userId))
        {
            const errRes = new ApiResponse(400, "User ID must be an integer");
            return res.status(errRes.httpStatus).json(errRes);
        }

        const userGetResult = await new UserRepository().getExistingUser(userId);
        return res.status(userGetResult.httpStatus).json(userGetResult);
    }

    static getUserByUsername = async(req: express.Request, res: express.Response) => {
        const userName = req.params.userName;
        if(userName === undefined || userName === "")
        {
            const errRes = new ApiResponse(400, "Missing username");
            return res.status(errRes.httpStatus).json(errRes);
        }
        const userGetResult = await new UserRepository().getExistingUserByUsername(userName);

        return res.status(userGetResult.httpStatus).json(userGetResult);
    }
}