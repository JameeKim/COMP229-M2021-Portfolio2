/**
 * server/models/user.ts
 *
 * Schema for user model
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { model, Document, PassportLocalModel, PassportLocalSchema, Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export type UserType = "admin" | "user";

type User = Express.User;

declare global {
    namespace Express {
        interface User extends Document {
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

const UserSchema = new Schema<User, PassportLocalModel<User>, User>(
    {
        username: {
            type: String,
            required: true,
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
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
        },
    },
);

// @ts-ignore
UserSchema.plugin(passportLocalMongoose);

const User = model<User>("User", UserSchema as PassportLocalSchema);
export default User;
