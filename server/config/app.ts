/**
 * server/config/app.ts
 *
 * Express server setup
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import createError, { HttpError } from "http-errors";
import express, { ErrorRequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import cors from "cors";

// auth-related imports
import session from "express-session";
import passport from "passport";
import User from "../models/user";
import flash from "connect-flash";

// router-related imports
import { setCommonVars } from "./middlewares";
import rootRouter from "../routes/root";
import contactsRouter from "../routes/contacts";
import adminRouter from "../routes/admin";

// launch MongoDB connection
mongoose.connect(process.env.DB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// provide the MongoDB connection result on the server log
const db = mongoose.connection;
db.on("error", () => console.error("connection error"));
db.once("open", () => console.log(`Connected to MongoDB at: ${process.env.DB_HOST}`));

const app = express();
export default app;

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// server middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// static files folders
app.use(express.static(path.join(__dirname, "../../client/public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

// auth-related middlewares
app.use(session({
  secret: process.env.AUTH_SECRET!,
  saveUninitialized: false,
  resave: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// set up passport auth
passport.use(User.createStrategy());
// @ts-ignore
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add commonly used local variables for the rendering of html
app.use(setCommonVars);

// routes setup
app.use("/", rootRouter);
app.use("/contacts", contactsRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(((err: HttpError, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}) as ErrorRequestHandler);
