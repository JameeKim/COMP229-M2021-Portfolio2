/**
 * server/routes/contacts.ts
 *
 * Routes setup for contacts list
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { Router } from "express";

import { authGuardBasic } from "../config/middlewares";

const router = Router();
export default router;

// protect the whole route
router.use(authGuardBasic);

// set the page variable in the rendering engine
router.use((req, res, next) => {
    res.locals.page = "contacts-list";
    next();
});

import * as controller from "../controllers/contacts";

// show contacts list
router.get("/", controller.displayContactsListPage);

// edit contacts list
router.get("/edit/:id", controller.displayContactsEditPage);
router.post("/edit/:id", controller.handleContactsEditRequest);

// delete a contact item
router.get("/delete/:id", controller.handleContactsDeleteRequest);
