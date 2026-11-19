import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Headers } from "../components/headers";
export function LandingPage() {

    useEffect(() => {
        isUserLogin();
    }, [])


    const navigate = useNavigate();
    const isUserLogin = async () => {
        const response = await fetch("http://localhost:5000/api/v1/auth/me", {
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