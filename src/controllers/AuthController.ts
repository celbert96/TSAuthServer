/**
 *  Class AuthController
 *
 *  Class AuthController provides functions for handling express requests to auth endpoints
 *
 *  Example Usage:
 *      express.Router().post('auth/setSessionCookie', AuthController.setSessionCookie);
 *
 */

import express from "express";
import {UserController} from "./UserController";
import {User} from "../models/entities/User";
import { compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {ApiResponse} from "../models/ApiResponse";
import {UserDTO} from "../models/dtos/UserDTO";
import { UserRepository } from "../repositories/UserRepository";

export class AuthController {
    /**
     * Validates user credentials then sets a new cookie in the client browser with the name sessionToken.
     * The body of the request contains user data which can be read by the client side application.
     *
     * Intended to be used by Single Page JavaScript Applications, where storing a JWT can be insecure.
     *
     * The sessionToken cookie has the following options set:
     *  - expires in 25 hours
     *  - httpOnly
     *
     * @param req The Express Request object
     * @param res The Express Response object
     *
     * @return An express Response object. The body of the Response will be an ApiResponse object - if the user
     * credentials were valid, then the user data will be returned in the body. Otherwise, an error message will
     * be returned.
     */
    static async setSessionCookie(req: express.Request, res: express.Response): Promise<express.Response> {
        const userName = req.body.username;
        const password = req.body.password;

        const credentialValidationResult = await AuthController.verifyUserCredentials(userName, password);

        if(credentialValidationResult.httpStatus !== 200) {
            return res.status(credentialValidationResult.httpStatus).json(credentialValidationResult);
        }

        const user = credentialValidationResult.data;

        const token = AuthController.createJwtForUser(user);
        const userDTO = new UserDTO(user);

        const responseBody = new ApiResponse<object>(200,
            'Auth token successfully generated',
            {"userData": userDTO}
        );

        const tokenExpiration = new Date().getDate() + 1;
        return res.cookie('sessionToken', token, {
            expires: new Date(Date.now() + 21536000000),
            sameSite: 'strict',
            httpOnly: true
        }).status(responseBody.httpStatus).json(responseBody);
    }

    /**
     * Removes the 'sessionToken' cookie from the client. Because the cookie is HttpOnly, the client application 
     * can't remove the cookie on its own.
     * 
     * @param req The Express Request object
     * @param res The Express Response object
     * @returns A Promise of type express.Response
     */
    static async removeSessionCookie(req: express.Request, res: express.Response): Promise<express.Response> {
        return res.clearCookie('sessionToken').status(200).json(new ApiResponse(200, 'Removed Session Cookie'));
    }

    /**
     * Validates user credentials then returns a JWT in the body of an express Response
     *
     * Intended to be used by clients which can store the JWT securely
     *
     * @param req The Express Request object
     * @param res The Express Response object
     *
     * @returns An express Response object. The body of the Response will be an ApiResponse object - if the user
     * credentials were valid, then the user data will be returned in the body along with a JWT.
     * Otherwise, an error message will be returned.
     */
    static async getAuthToken(req: express.Request, res: express.Response): Promise<express.Response> {
        const userName = req.body.username;
        const password = req.body.password;

        const credentialValidationResult = await AuthController.verifyUserCredentials(userName, password);

        if(credentialValidationResult.httpStatus !== 200) {
            return res.status(credentialValidationResult.httpStatus).json(credentialValidationResult);
        }

        const user = credentialValidationResult.data;

        const token = AuthController.createJwtForUser(user);
        const userDTO = new UserDTO(user);

        const responseBody = new ApiResponse<object>(200,
            'Auth token successfully generated',
            {
                "authToken": token,
                "userData": userDTO
            }
        );

        return res.status(responseBody.httpStatus).json(responseBody);
    }

    /**
     * Helper function which verifies the user's credentials
     *
     * First checks if the user exists in the data repository, then hashes the function's password parameter
     * and compares it to the hash in the retrieved user data
     *
     * @param userName The user's username
     * @param password The user's password
     *
     * @returns An express Response object. The body of the Response will be an ApiResponse object - if the user
     * credentials are valid, then the user's data is returned along with an httpStatus of 200. Otherwise, a 400
     * and an error message is returned
     */
    static async verifyUserCredentials(userName: string, password: string): Promise<ApiResponse<any>> {
        const userGetResult = await new UserRepository().getExistingUserByUsername(userName, true);

        if(userGetResult.httpStatus !== 200) {
            return userGetResult;
        }

        const user = userGetResult.data;
        const passwordIsValid = await compare(password, user.password);

        if(passwordIsValid !== true)
        {
            return new ApiResponse(400, 'Incorrect password');
        }

        return new ApiResponse<User>(200, 'Credentials are valid', user);
    }

    /**
     * Helper function which generates a new JWT for a user
     *
     * The JWT contains:
     *  - The user's ID (userID)
     *  - The user's roles (roles)
     *
     * @param user
     *
     * @returns A JWT which expires in 900 seconds
     */
    static createJwtForUser(user: User): string {
        const JWT_EXPIRES_IN_SEC = 900;

        const payload = {
          userId: user.id,
          roles: user.roles
        };

        return jwt.sign({payload}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:JWT_EXPIRES_IN_SEC});
    }
}