/**
 *  Class User
 *
 *  Class User is a TypeORM entity which is used to model user data
 *
 *  @property   {number}    id          - A unique ID associated to a user record. Generated by the database
 *  @property   {string}    userName    - The user's username. Unique/not null
 *  @property   {string}    email       - The user's email. Unique/not null
 *  @property   {string}    password    - The user's password. Not null. Is hashed before being inserted into the database
 *  @property   {Role[]}    roles       - An array of the user's Roles
 *
 *  Example Usage:
 *
 *      const user = new User();
 *      user.email = req.body.email;
 *      user.password = req.body.password;
 *      user.userName = req.body.userName;
 *
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BeforeInsert } from "typeorm";
import { Role } from "./Role";
import { hash } from "bcryptjs";
import { ApiResponse } from "../ApiResponse";
import { ValidationErrors } from "../ValidationErrors";
import { ValidationError } from "../ValidationError";
import * as EmailValidator from "email-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    userName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ select: false, nullable: false })
    password: string;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles: Role[];


    // hash the password before creating a new record
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await hash(this.password, 10);
    }

    /** Validate property values */
    validate(): ApiResponse<Map<string, ValidationError[]>> {
        const validationErrors: Map<string, ValidationError[]> = new Map();

        /** userName validations */
        if (this.userName === undefined || this.userName === '') {
            const err = new ValidationError('userName', ValidationErrors.MISSING_VALUE, 'Username is required');

            if (validationErrors.has('userName')) {
                validationErrors.get('userName').push(err);
            }
            else {
                validationErrors.set('userName', [err]);
            }
        }

        if (/^[a-z0-9]+$/i.test(this.userName) === false) {
            const err = new ValidationError('userName', ValidationErrors.INVALID_VALUE, 'Username must be alphanumeric');
            if (validationErrors.has('userName')) {
                validationErrors.get('userName').push(err);
            }
            else {
                validationErrors.set('userName', [err]);
            }
        }

        /** email validations */
        if (this.email === undefined || this.email === '') {
            const err = new ValidationError('email', ValidationErrors.MISSING_VALUE, 'Email is required');

            if (validationErrors.has('email')) {
                validationErrors.get('email').push(err);
            }
            else {
                validationErrors.set('email', [err]);
            }
        }

        if (!EmailValidator.validate(this.email)) {
            const err = new ValidationError('email', ValidationErrors.INVALID_VALUE, 'Email is improperly formatted');

            if (validationErrors.has('email')) {
                validationErrors.get('email').push(err);
            }
            else {
                validationErrors.set('email', [err]);
            }
        }

        /** password validation */
        if (this.password === undefined || this.password === '') {
            const err = new ValidationError('password', ValidationErrors.MISSING_VALUE, 'Password is required')
            if (validationErrors.has('password')) {
                validationErrors.get('password').push(err);
            }
            else {
                validationErrors.set('password', [err]);
            }
        }


        if (validationErrors.size === 0) {
            return new ApiResponse<Map<string, ValidationError[]>>(200, 'Model is valid', validationErrors);
        }

        return new ApiResponse<Map<string, ValidationError[]>>(422, 'Model is invalid', validationErrors);
    }

}
