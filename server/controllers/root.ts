/**
 * server/controllers/root.ts
 *
 * Root-level controllers
 *
 * Dohyun Kim 301058465
 * Jun. 17, 2021
 */

import { RequestHandler } from "express";

import Project from "../models/project";

export const displayHomePage: RequestHandler = (req, res) => {
    res.render("index", { title: "", page: "home" });
};

export const displayAboutPage: RequestHandler = (req, res) => {
    res.render("index", { title: "About Us", page: "about" });
};

export const displayProjectsPage: RequestHandler = (req, res, next) => {
    Project.find().sort("-started").exec((err, projects) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        const formatter = new Intl.DateTimeFormat("en-CA", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
        });
        res.render("index", { title: "Projects", page: "projects", projects, formatter });
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

export const displayRegisterPage: RequestHandler = (req, res) => {
    if (!req.user) {
        res.render("index", { title: "Sign Up", page: "register", messages: req.flash() });
    } else {
        res.redirect("/");
    }
};
