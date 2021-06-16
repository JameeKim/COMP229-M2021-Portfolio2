/**
 * server/controllers/admin.ts
 *
 * Admin menu controllers
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import { RequestHandler } from "express";

import Project from "../models/project";

/**
 * Render and show the admin panel page
 */
export const displayAdminPanel: RequestHandler = (req, res) => {
    res.render("index", { title: "Admin Panel" });
};

/**
 * Render and show the list of projects
 */
export const displayProjects: RequestHandler = (req, res, next) => {
    Project.find((err, projects) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        res.render("index", { title: "Manage Projects", subpage: "projects", projects });
    });
};

/**
 * Render and show the editing page of the given project
 */
export const displayProjectEditPage: RequestHandler = (req, res, next) => {
    Project.findById(req.params.id).exec((err, project) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        res.render("index", { title: "Edit Project", subpage: "project-edit", project });
    });
};
