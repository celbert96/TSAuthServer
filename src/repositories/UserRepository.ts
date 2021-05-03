import {IUserRepository} from "./IUserRepository";
import {ApiResponse} from "../models/ApiResponse";
import {User} from "../models/entities/User";
import {getConnection} from "typeorm";

export class UserRepository implements IUserRepository {
    async deleteUser(user: User): Promise<ApiResponse<User>> {
        const connection = getConnection();
        const userRepository = connection.getRepository(User);

        const deletedUser = await userRepository.remove(user);
        if(deletedUser !== undefined) {
            return new ApiResponse<User>(
                200,
                "Successfully deleted user with id " + deletedUser.id,
                deletedUser
            );
        }

        return new ApiResponse<User>(
            400,
            "No user with id " + user.id
        );
    }

    async getExistingUser(userId: number, includePassword = false): Promise<ApiResponse<User>> {
        const connection = getConnection();
        const userRepository = connection.getRepository(User);

        let user: User;
        if(includePassword !== true) {
            user = await userRepository.createQueryBuilder("user")
                .select(["user.id", "user.userName", "user.email"])
                .leftJoinAndSelect("user.roles", "role")
                .where("user.id = :id", {id: userId})
                .getOne();
        }
        else {
            user = await userRepository.createQueryBuilder("user")
                .select(["user.id", "user.name", "user.email"])
                .addSelect("user.password")
                .leftJoinAndSelect("user.roles", "role")
                .where("user.id = :id", {id: userId})
                .getOne();
        }

        if(user !== undefined) {
            return new ApiResponse<User>(
                200,
                "Successfully retrieved user with id " + userId,
                user
            );
        }

        return new ApiResponse<User>(404, "No user with id " + userId);
    }

    async getExistingUserByUsername(username: string, includePassword = false): Promise<ApiResponse<User>> {
        const connection = getConnection();
        const userRepository = connection.getRepository(User);

        let user: User;
        if(includePassword !== true) {
            user = await userRepository.findOne({userName: username});
        }
        else {
            user = await userRepository.createQueryBuilder("user")
                .select(["user.id", "user.userName", "user.email"])
                .addSelect("user.password")
                .leftJoinAndSelect("user.roles", "role")
                .where("user.userName = :userName", {userName: username})
                .getOne();
        }

        if(user !== undefined) {
            return new ApiResponse<User>(
                200,
                "Successfully retrieved user with username " + username,
                user
            );
        }

        return new ApiResponse<User>(
            404,
            "No user with username " + username
        );
    }

    async registerNewUser(user: User): Promise<ApiResponse<any>> {
        const connection = getConnection();
        const userRepo = connection.getRepository(User);

        const addedUser = await userRepo.save(user);
        if(addedUser instanceof User) {
            return new ApiResponse(
                201,
                'Created new user with ID ' + addedUser.id,
            );
        }

        return new ApiResponse(500, 'Could not create user', addedUser);

    }

    async updateExistingUser(user: User): Promise<ApiResponse<User>> {
        const connection = getConnection();
        const userRepository = connection.getRepository(User);

        const updatedUser = await userRepository.save(user);
        if(updatedUser !== undefined) {
            return new ApiResponse<User>(
                200,
                "Successfully updated user with id " + updatedUser.id,
                updatedUser
            );
        }

        return new ApiResponse<User>(
            400,
            "No user with id " + user.id
        );
    }

}