/**
 * server/config/app.ts
 *
 * Express server setup
 *
 * Dohyun Kim 301058465
 * Jun. 8, 2021
 */

import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";

import indexRouter from "../routes/index";

// launch MongoDB connection
const dbUri = process.env.DB_URI;
if (!dbUri) {
  console.error("DB_URI environment variable does not exist");
  process.exit(1);
}
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

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

// static files folders
app.use(express.static(path.join(__dirname, "../../client/public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

// routes setup
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
