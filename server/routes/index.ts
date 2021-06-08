/**
 * server/routes/index.ts
 *
 * Root-level routes setup
 *
 * Dohyun Kim 301058465
 * Jun. 4, 2021
 */

import express from "express";

const router = express.Router();
export default router;

/**
 * Route set-ups
 */

// import the controller
import * as indexController from "../controllers";

// home page
router.get("/", indexController.displayHomePage);
router.get("/home", indexController.displayHomePage);

// about page
router.get("/about", indexController.displayAboutPage);

// projects page
router.get("/projects", indexController.displayProjectsPage);

// services page
router.get("/services", indexController.displayServicesPage);

// contact page
router.get("/contact", indexController.displayContactPage);

// temporary response for contact page form submission
router.post("/contact", (req, res, next) => {
  res.redirect("/", 303);
});
