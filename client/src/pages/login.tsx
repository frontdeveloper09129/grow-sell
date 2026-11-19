import type React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const AUTH_API:any = import.meta.env.VITE_AUTH_API_URL;

        const response = await fetch(`${AUTH_API}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })

        });

        const data = await response.json();

        if (response.ok) {
            console.log(data)
            navigate("/dashboard")
        } else {
            console.log(data)
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                className="w-full max-w-125 flex flex-col gap-4 border p-6"
                onSubmit={handleSubmit}
            >
                <h1 className="text-center text-2xl">Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="border p-2">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login