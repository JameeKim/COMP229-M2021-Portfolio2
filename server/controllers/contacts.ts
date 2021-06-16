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

/**
 * Render and show the contacts list page
 */
export const displayContactsListPage: RequestHandler = (req, res, next) => {
    Contact.find()
        .sort("lastName firstName created") // sort by name
        .exec((err, contacts) => {
            if (err) {
                console.error(err);
                next(err);
                return;
            }

            res.render("index", { title: "Contacts List", subpage: "show", contacts });
        });
};

/**
 * Render and show the edit page of the given contact item
 */
export const displayContactsEditPage: RequestHandler = (req, res, next) => {
    Contact.findById(req.params.id).exec((err, contact) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        res.render("index", { title: "Edit Contact", subpage: "edit", contact });
    });
};

/**
 * Handle the POST request for editing a contact item
 */
export const handleContactsEditRequest: RequestHandler = (req, res, next) => {
    Contact.findByIdAndUpdate(req.params.id, {
        $set: { // prevent overwriting the whole document
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone || undefined,
            category: req.body.category,
            message: req.body.message,
        },
    }).exec((err) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        res.redirect("/contacts");
    });
};

/**
 * Handle the request to delete a contact item
 */
export const handleContactsDeleteRequest: RequestHandler = (req, res, next) => {
    Contact.findByIdAndDelete(req.params.id).exec((err) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        res.redirect("/contacts");
    });
};
