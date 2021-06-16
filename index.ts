/**
 * index.ts
 *
 * Entry point for the server-side
 *
 * Dohyun Kim 301058465
 * Jun. 16, 2021
 */

import createError from "http-errors";
import debug from "debug";
import http from "http";
import dotenv from "dotenv";

debug("portfolio:server");
dotenv.config();

// check all necessary environment variables
const envVars = ["DB_URI", "AUTH_SECRET"];
const undefinedVars = [];
for (const envVar of envVars) {
    if (typeof(process.env[envVar]) === "undefined") {
        undefinedVars.push(envVar);
    }
}
if (undefinedVars.length > 0) {
    console.error(`Necessary environment variables not found: ${undefinedVars.join(", ")}`);
    process.exit(1);
}

import app from "./server/config/app";

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): number | string | boolean {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
    // named pipe
        return val;
    }

    if (port >= 0) {
    // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: createError.HttpError): void {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
    case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr?.port;
    debug("Listening on " + bind);
}
