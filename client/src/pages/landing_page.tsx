import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Headers } from "../components/headers";
export function LandingPage() {

    useEffect(() => {
        isUserLogin();
    }, [])


    const navigate = useNavigate();
    const isUserLogin = async () => {
        const AUTH_API:any = import.meta.env.VITE_AUTH_API_URL === 'true';
        const API_URL = AUTH_API ? "https://grow-sell-1.onrender.com" : "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/v1/auth/me`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        });


        const data = await response.json();

        if(response.ok) {
            navigate('/dashboard')
            console.log(data)
        }else {
            console.log(data);
            navigate('/')
        }
    }
    return (
        <div>
            <Headers />
        </div>
    )
}