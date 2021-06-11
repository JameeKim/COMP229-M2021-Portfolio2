/**
 * server/controllers/admin.ts
 *
 * Admin menu controllers
 *
 * Dohyun Kim 301058465
 * Jun. 8, 2021
 */

import { NextFunction, Request, Response } from "express";

import Project from "../models/project";

export function displayAdminPanel(req: Request, res: Response, next: NextFunction): void {
    res.render("index", { title: "Admin Panel", page: "admin" });
}

export function displayProjects(req: Request, res: Response, next: NextFunction): void {
    Project.find((err, projects) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        res.render("index", {
            title: "Manage Projects",
            page: "admin",
            subpage: "projects",
            projects,
        });
    });
}

export function displayProjectEditPage(req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;

    Project.findById(id, {}, {}, (err, project) => {
        if (err) {
            console.error(err);
            next(err);
            return;
        }

        res.render("index", {
            title: "Edit Project",
            page: "admin",
            subpage: "project-edit",
            project,
        });
    });
}
