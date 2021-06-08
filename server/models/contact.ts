/**
 * server/models/contact.ts
 *
 * Schema for contact model parsed from contact page form
 *
 * Dohyun Kim 301058465
 * Jun. 8, 2021
 */

import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
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
        category: {
            type: String,
            enum: ["default", "devRequest", "other"],
            default: "other",
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        collection: "contacts",
    },
);

const Model = mongoose.model("Contact", ContactSchema);
export default Model;
