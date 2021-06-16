/**
 * server/routes/admin.ts
 *
 * Routes setup for admin menus
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { Router } from "express";

import { authGuardAdmin } from "../config/middlewares";

const router = Router();
export default router;

// restrict the access the whole route to the admin users
router.use(authGuardAdmin);

// set the page variable in the rendering engine
router.use((req, res, next) => {
    res.locals.page = "admin";
    next();
});

import * as controller from "../controllers/admin";

// show admin panel
router.get("/", controller.displayAdminPanel);

// TODO move to a separate router
router.get("/projects", controller.displayProjects);
router.get("/projects/edit/:id", controller.displayProjectEditPage);
