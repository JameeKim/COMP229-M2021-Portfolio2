/**
 * server/controllers/user.ts
 *
 * Controllers for users and authentication
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { RequestHandler } from "express";
import passport from "passport";

import User from "../models/user";

/**
 * Attempt to log in the user and redirect to login page if failed
 *
 * **NOTE**: Another handler must be set in order to handle the success case.
 */
const doLogin: RequestHandler = passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Authentication Error",
});

/**
 * Redirect the user to the appropriate page
 *
 * **NOTE**: This middleware assumes that the user is already authenticated.
 */
const afterLogin: RequestHandler = (req, res) => {
    const dest = req.user!.type === "admin" ? "/admin" : "/contacts";
    res.redirect(dest);
};

/**
 * Get the login attempt, authenticate, and redirect to the appropriate page
 */
export const handleLoginRequest: RequestHandler = (req, res, next) => {
    doLogin(req, res, () => afterLogin(req, res, next));
};

/**
 * Log out the user and redirect to the login page
 */
export const handleLogoutRequest: RequestHandler = (req, res) => {
    req.logout();
    res.redirect("/login");
};

/**
 * Register the user with the submitted information and automatically login
 */
export const handleRegisterRequest: RequestHandler = (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone || undefined,
    });

    // insert the new user
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error("Error while inserting a new user");
            if (err.name === "UserExistsError") {
                console.error("Error already exists");
            }
            req.flash("registerMessage", "Registration Error");
            res.redirect("/register");
            return;
        }

        // automatically login the user
        req.login(newUser, (err) => {
            if (err) {
                console.error(err);
                next(err);
                return;
            }

            afterLogin(req, res, next);
        });
    });
};
