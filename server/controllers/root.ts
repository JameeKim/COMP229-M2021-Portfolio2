/**
 * server/controllers/root.ts
 *
 * Root-level controllers
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { RequestHandler } from "express";
import passport from "passport";

import Project from "../models/project";
import User from "../models/user";

export const displayHomePage: RequestHandler = (req, res) => {
    res.render("index", { title: "", page: "home" });
};

export const displayAboutPage: RequestHandler = (req, res) => {
    res.render("index", { title: "About Us", page: "about" });
};

export const displayProjectsPage: RequestHandler = (req, res, next) => {
    Project.find((err, projects) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        res.render("index", { title: "Projects", page: "projects", projects });
    });
};

export const displayServicesPage: RequestHandler = (req, res) => {
    res.render("index", { title: "Services", page: "services" });
};

export const displayContactPage: RequestHandler = (req, res) => {
    res.render("index", { title: "Contact Us", page: "contact" });
};

export const displayLoginPage: RequestHandler = (req, res) => {
    if (!req.user) {
        res.render("index", { title: "Sign In", page: "login", messages: req.flash() });
    } else {
        res.redirect("/");
    }
};

export const handleLoginRequest: RequestHandler = (req, res, next) => {
    passport.authenticate("local", (err, user: Express.User | false) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        if (!user) {
            req.flash("loginMessage", "Authentication Error");
            res.redirect("/login");
            return;
        }

        req.login(user, (err) => {
            if (err) {
                console.error(err);
                next(err);
                return;
            }

            res.redirect(user.type === "admin" ? "/admin" : "/contacts");
        });
    })(req, res, next);
};

export const handleLogoutRequest: RequestHandler = (req, res) => {
    req.logout();
    res.redirect("/login");
};

export const displayRegisterPage: RequestHandler = (req, res) => {
    if (!req.user) {
        res.render("index", { title: "Sign Up", page: "register", messages: req.flash() });
    } else {
        res.redirect("/");
    }
};

export const handleRegisterRequest: RequestHandler = (req, res) => {
    const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone || undefined,
    });

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

        // automatically login the registered user
        passport.authenticate("local")(req, res, () => res.redirect("/"));
    });
};
