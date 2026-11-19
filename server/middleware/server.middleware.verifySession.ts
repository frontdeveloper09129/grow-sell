import express from "express";
import pool from "../database/database.js";
import { createHash } from "node:crypto";

export const VerifySession = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies.sessionId; 
        if (!sessionToken) {
            return res.status(401).json({ message: "Please log in first" });
        }

        const hashedSessionId = createHash("sha256")
            .update(sessionToken)
            .digest("hex");

        // 1. IMPROVED: JOIN public.users to fetch the username along with user_id
        // Also added an expiration sanity check to ensure the session hasn't expired
        const result = await pool.query(
            `SELECT s.user_id, u.username, u.email
             FROM public.sessions s
             INNER JOIN public.users u ON s.user_id = u.id
             WHERE s.session_id = $1 AND s.expires_at > NOW()`, 
            [hashedSessionId]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid or expired session" });
        }

        // 2. CRITICAL BUG FIX: Extract the specific column values, not the entire row object!
        const sessionData = result.rows[0]; 

        // 3. Attach both pieces of information cleanly to the request object
        (req as any).userId = sessionData.user_id;  // This is now a clean integer (e.g. 1)
        (req as any).username = sessionData.username; // This is a clean string (e.g. "JohnDoe")
        (req as any).email = sessionData.email;

        next();



        // take note we have to delete the session or token from database if user logout ot expires the token
        //  -> planning to do this process




    } catch (error) {
        console.error("Session verification error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
