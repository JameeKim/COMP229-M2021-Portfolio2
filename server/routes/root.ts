/**
 * server/routes/root.ts
 *
 * Root-level routes setup
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import express from "express";

const router = express.Router();
export default router;

// import the controller
import * as controller from "../controllers/root";
import * as userController from "../controllers/user";
import { handleContactsAddRequest } from "../controllers/contacts";

// home page
router.get("/", controller.displayHomePage);
router.get("/home", controller.displayHomePage);

// about page
router.get("/about", controller.displayAboutPage);

// projects page
router.get("/projects", controller.displayProjectsPage);

// services page
router.get("/services", controller.displayServicesPage);

// contact page
router.get("/contact", controller.displayContactPage);
router.post("/contact", handleContactsAddRequest);

// sign in page
router.get("/login", controller.displayLoginPage);
router.post("/login", userController.handleLoginRequest);

// sign out request
router.get("/logout", userController.handleLogoutRequest);

// sign up page
router.get("/register", controller.displayRegisterPage);
router.post("/register", userController.handleRegisterRequest);
