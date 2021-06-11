/**
 * server/routes/admin.ts
 *
 * Routes setup for admin menus
 *
 * Dohyun Kim 301058465
 * Jun. 8, 2021
 */

import { Router } from "express";

const router = Router();
export default router;

import * as controller from "../controllers/admin";

router.get("/", controller.displayAdminPanel);

router.get("/projects", controller.displayProjects);
router.get("/projects/edit/:id", controller.displayProjectEditPage);
