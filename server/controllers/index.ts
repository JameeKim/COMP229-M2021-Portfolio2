/**
 * server/controllers/index.ts
 *
 * Root-level controllers
 *
 * Dohyun Kim 301058465
 * Jun. 14, 2021
 */

import { Request, Response, NextFunction } from "express";

import Project from "../models/project";
import User from "../models/user";

export function displayHomePage(req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "", page: "home" });
}

export function displayAboutPage(req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "About Us", page: "about" });
}

export function displayProjectsPage(req: Request, res: Response, next: NextFunction): void {
  Project.find((err, projects) => {
    if (err) {
      console.error(err);
      next(err);
      return;
    }

    res.render("index", { title: "Projects", page: "projects", projects });
  });
}

export function displayServicesPage(req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "Services", page: "services" });
}

export function displayContactPage(req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "Contact Us", page: "contact" });
}

export function displayLoginPage(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.render("index", { title: "Sign In", page: "login", messages: req.flash("loginMessage") });
  } else {
    res.redirect("/");
  }
}

export function handleLoginRequest(req: Request, res: Response, next: NextFunction): void {
  // TODO
}

export function handleLogoutRequest(req: Request, res: Response, next: NextFunction): void {
  req.logout();
  res.redirect("/login");
}

export function displayRegisterPage(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.render("index", { title: "Sign Up", page: "register", messages: req.flash("registerMessage") });
  } else {
    res.redirect("/");
  }
}

export function handleRegisterRequest(req: Request, res: Response, next: NextFunction): void {
  // TODO
}
