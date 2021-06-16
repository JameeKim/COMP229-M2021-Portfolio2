/**
 * server/models/user.ts
 *
 * Schema for user model
 *
 * Dohyun Kim 301058465
 * Jun. 15, 2021
 */

import mongoose, { PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export type UserType = "admin" | "user";

type User = Express.User;

declare global {
    namespace Express {
        interface User extends mongoose.Document {
            username: string;
            created: Date;
            updated: Date;
            firstName: string;
            lastName: string;
            email: string;
            phone?: string;
            type: UserType;
        }
    }
}

const UserSchema = new mongoose.Schema<User>(
    {
        username: {
            type: String,
            required: true,
        },
        created: {
            type: Date,
            default: Date.now,
        },
        updated: {
            type: Date,
            default: Date.now,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: String,
        type: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    {
        collection: "users",
    },
);

// @ts-ignore
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model<User>("User", UserSchema as PassportLocalSchema);
export default User;
