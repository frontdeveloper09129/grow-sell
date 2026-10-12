import pool from "../database/database.js";
import bcrypt from "bcrypt";
import { use } from "bcrypt/promises.js";
import { json, type Request, type Response } from "express";

export const Register = async (req: Request, res: Response) => {
    try {
        const { fullname, username, email, password, confirmPassword } = req.body;

        if (!fullname || !username || !email || !password || !confirmPassword) {
            return res.status(401).json({ message: "please fill up all the fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const isEmailExist = await pool.query(
            "SELECT id FROM users WHERE email = $1", [email]
        );

        if (isEmailExist.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        };

        const hashPassword = await bcrypt.hash(password, 12);


        const insert = await pool.query(
            `INSERT INTO public.users (fullname, username, email, password)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id, fullname, username, email, password`,
            [fullname, username, email, hashPassword]
        );


        if (!insert) return res.status(401).json({ message: "unsuccesfull create account" })

        return res.status(200).json({ message: 'create succesfull account', fullname: fullname, username: username, email: email })
    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            success: false,
            message: "An internal server error occurred"
        });
    }
}

export async function Login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all the fields"
            });
        }

        const result = await pool.query(
            "SELECT id, username, email, password FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "An internal server error occurred"
        });
    }
}
