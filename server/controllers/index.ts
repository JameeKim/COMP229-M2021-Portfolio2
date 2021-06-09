/**
 * server/controllers/index.ts
 *
 * Root-level controllers
 *
 * Dohyun Kim 301058465
 * Jun. 8, 2021
 */

import { Request, Response, NextFunction } from "express";

import Project from "../models/project";

/**
 * List of static pages that go into the navigation bar
 */
const navBarLinks = [
  {
    url: "/",
    text: "Home",
    id: "home",
  },
  {
    url: "/about",
    text: "About Us",
    id: "about",
  },
  {
    url: "/projects",
    text: "Projects",
    id: "projects",
  },
  {
    url: "/services",
    text: "Services",
    id: "services",
  },
  {
    url: "/contact",
    text: "Contact Us",
    id: "contact",
  },
];

export function displayHomePage(req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "", page: "home", navBarLinks });
}

export function displayAboutPage(req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "About Us", page: "about", navBarLinks });
}

export function displayProjectsPage(req: Request, res: Response, next: NextFunction): void {
  Project.find((err, projects) => {
    if (err) {
      console.error(err);
      next(err);
      return;
    }

    res.render("index", { title: "Projects", page: "projects", navBarLinks, projects });
  });
}

export function displayServicesPage(req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "Services", page: "services", navBarLinks });
}

export function displayContactPage(req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "Contact Us", page: "contact", navBarLinks });
}
