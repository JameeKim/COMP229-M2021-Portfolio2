/**
 * server/models/contact.ts
 *
 * Schema for contact model parsed from contact page form
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { model, Model, Schema } from "mongoose";

export type ContactCategory = "default" | "devRequest" | "other";

interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    category: ContactCategory;
    message: string;
    created: Date,
}

const ContactSchema = new Schema<Contact, Model<Contact>, Contact>(
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
        timestamps: {
            createdAt: "created",
            updatedAt: false,
        },
    },
);

const Contact = model<Contact>("Contact", ContactSchema);
export default Contact;
