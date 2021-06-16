/**
 * server/controllers/contacts.ts
 *
 * Controllers for contacts list
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { RequestHandler } from "express";
import Contact from "../models/contact";

export const displayContactsListPage: RequestHandler = (req, res, next) => {
    Contact.find()
        .sort("lastName firstName created")
        .exec((err, contacts) => {
            if (err) {
                console.error(err);
                next(err);
                return;
            }

            res.render("index", {
                title: "Contacts List",
                subpage: "show",
                contacts,
            });
        });
};
