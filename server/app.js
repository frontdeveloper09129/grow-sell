import "dotenv/config"
import express, { Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"


import auth from "./routes/auth.routes.ts"
import DatagatheringPlants from './routes/products.routes.ts'
import pool from "./database/database.js"

const app = express();
const PORT = process.env.PORT || 5000;

// Validate required environment variables
if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL is missing from .env");
    process.exit(1);
}


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10kb" }));

// this is for getting the session from the browser
app.use(cookieParser());

app.use('/api/v1/auth', auth)
app.use('/api/v2/addListingPlants', DatagatheringPlants)


// Backend health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Backend is running"
    });
});

// Database health check
app.get("/api/health/db", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.status(200).json({
            status: "ok",
            message: "Neon database connection is working"
        });
    } catch (error) {
        console.error("Database health check failed:", error.message);

        res.status(503).json({
            status: "error",
            message: "Database is currently unavailable"
        });
    }
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Centralized error handler
app.use((error, req, res, next) => {
    console.error("Request error:", error.message);

    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof SyntaxError && error.status === 400) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request body"
        });
    }

    res.status(500).json({
        success: false,
        message: "An internal server error occurred"
    });
});

// Start only after verifying the database connection
let server;

async function startServer() {
    try {
        await pool.query("SELECT 1");

        console.log("Neon PostgreSQL connected successfully");

        server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to Neon:", error.message);
        await pool.end();
        process.exit(1);
    }
}

// Graceful shutdown
let isShuttingDown = false;

async function shutdown(signal) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`${signal} received. Shutting down...`);

    if (server) {
        server.close(async () => {
            try {
                await pool.end();
                console.log("Server and database pool closed");
                process.exit(0);
            } catch (error) {
                console.error("Shutdown error:", error.message);
                process.exit(1);
            }
        });
    } else {
        await pool.end();
        process.exit(0);
    }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
