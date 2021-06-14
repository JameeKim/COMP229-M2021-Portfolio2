/**
 * server/models/user.ts
 *
 * Schema for user model
 *
 * Dohyun Kim 301058465
 * Jun. 14, 2021
 */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
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
    },
);

const Model = mongoose.model("User", UserSchema);
export default Model;
