/**
 * server/routes/contacts.ts
 *
 * Routes setup for contacts list
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { Router } from "express";

const router = Router();
export default router;

// set the page variable in the rendering engine
router.use((req, res, next) => {
    res.locals.page = "contacts-list";
    next();
});

import * as controller from "../controllers/contacts";

// show contacts list
router.get("/", controller.displayContactsListPage);
