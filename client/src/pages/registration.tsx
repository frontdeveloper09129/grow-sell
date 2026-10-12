import { useState } from "react"

export function Registration() {

    const [fullname, setFullname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/registration", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullname,
                    username,
                    email,
                    password,
                    confirmPassword
                })
            })

            const data = await response.json();

            if (response.ok) {
                console.log(data)
            } else {
                console.log(data)
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className="flex justify-center items-center text-center p-4">
            <form className="w-full max-w[500px] h-[600px] flex flex-col gap-4 border flex items-center justify-center " onSubmit={handleSubmit}>
                <input
                    className="w-[300px] h-[50px] border p-2"
                    type="fullname"
                    name="fullname"
                    placeholder="Fullname.."
                    onChange={(e) => setFullname(e.target.value)}
                />
                <input
                    className="w-[300px] h-[50px] border p-2"
                    type="username"
                    name="username"
                    placeholder="Username.."
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="w-[300px] h-[50px] border p-2"
                    type="email"
                    name="email"
                    placeholder="email.."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-[300px] h-[50px] border p-2"
                    type="password"
                    name="password"
                    placeholder="Password.."
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className="w-[300px] h-[50px] border p-2"
                    type="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password.."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button className="border w-[100px] h-[50px]" type="submit">Create</button>
            </form>
        </div>
    )
}