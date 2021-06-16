/**
 * server/config/middlewares.ts
 *
 * Middlewares used throughout the server
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { RequestHandler } from "express";
import createError from "http-errors";

import navBarLinks from "./navBarLinks";
import { UserType } from "../models/user";

/**
 * Middleware for setting up commonly used variables for the rendering engine
 */
export const setCommonVars: RequestHandler = (req, res, next) => {
    res.locals.navBarLinks = navBarLinks;
    res.locals.user = req.user;

    next();
};

/**
 * Create a customized middleware for guarding a route with authorization
 *
 * @param userType Necessary user type or a callback that checks the given type is ok to access
 * @param fail URL to redirect in case the user is not authorized, or a handler for custom behavior,
 *             or undefined to create 403 Forbidden response
 */
export const authGuardFactory = (
    userType: UserType | ((t: UserType) => boolean),
    fail?: string | RequestHandler,
): RequestHandler => {
    // authorization check function
    const authCheck = typeof(userType) === "string" ? (t: UserType) => t === userType : userType;

    // function to call when authorization fails
    const failCallback: RequestHandler = !fail
        ? (req, res, next) => next(createError(403)) // 403 Forbidden error
        : typeof(fail) === "string" ? (req, res) => res.redirect(fail) : fail;

    // the generated middleware
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            // redirect to the login page if the user is not authenticated
            res.redirect("/login");
        } else if (authCheck(req.user.type)) {
            // authorization successful
            next();
        } else {
            // authorization failed
            failCallback(req, res, next);
        }
    };
};

/**
 * Middleware that checks if the user is logged in
 */
export const authGuardBasic: RequestHandler
    = (req, res, next) => req.isAuthenticated() ? next() : res.redirect("/login");

/**
 * Middleware that only allows admin users
 */
export const authGuardAdmin: RequestHandler = authGuardFactory("admin");
