/**
 * server/routes/index.ts
 *
 * Root-level routes setup
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
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
router.post("/contact", indexController.handleContactRequest);

// sign in page
router.get("/login", indexController.displayLoginPage);
router.post("/login", indexController.handleLoginRequest);

// sign out request
router.get("/logout", indexController.handleLogoutRequest);

// sign up page
router.get("/register", indexController.displayRegisterPage);
router.post("/register", indexController.handleRegisterRequest);
