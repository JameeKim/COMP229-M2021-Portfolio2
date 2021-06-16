/**
 * server/models/contact.ts
 *
 * Schema for contact model parsed from contact page form
 *
 * Dohyun Kim 301058465
 * Jun. 15, 2021
 */

import mongoose from "mongoose";

export type ContactCategory = "default" | "devRequest" | "other";

interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    category: ContactCategory;
    message: string;
}

const ContactSchema = new mongoose.Schema<Contact>(
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

const Contact = mongoose.model<Contact>("Contact", ContactSchema);
export default Contact;
