/**
 * server/models/user.ts
 *
 * Schema for user model
 *
 * Dohyun Kim 301058465
 * Jun. 14, 2021
 */

import mongoose, { PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema(
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

UserSchema.plugin(passportLocalMongoose);

const Model = mongoose.model("User", UserSchema as PassportLocalSchema);
export default Model;
