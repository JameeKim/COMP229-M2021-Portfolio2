/**
 * server/controllers/index.ts
 *
 * Root-level controllers
 *
 * Dohyun Kim 301058465
 * Jun. 15, 2021
 */

import { Request, Response, NextFunction } from "express";
import passport from "passport";

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
  passport.authenticate("local", (err, user, info) => {
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

      res.redirect("/");
    });
  })(req, res, next);
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
        console.error("Error: User already exists");
      }
      req.flash("registerMessage", "Registration Error");
      res.redirect("/register");
      return;
    }

    // automatically login the registered user
    passport.authenticate("local")(req, res, () => res.redirect("/"));
  });
}
