import { SideBar } from "../components/components.sidebar";
import { useNavStore } from "../store/store";
import PlantListingPage from "./plantListingPage.tsx";
import OverView from "../components/overview.components.tsx";
import AddListingPage from "./addListingPage.tsx";
import { useEffect} from "react";

export function Dashboard() {

    const getSaleAnalysis = async () => {
        const AUTH_API:any = import.meta.env.VITE_AUTH_API_URL === 'true';
        const API_URL = AUTH_API ? "https://grow-sell-server.onrender.com" : "http://localhost:5000";
        try {
            const response = await fetch(`${API_URL}/api/v2/addListingPlants/sale_analysis/product`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Client-side received data:", data);
            } else {
                console.log(data)
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }


    useEffect(() => {
        getSaleAnalysis()
    }, [])

    // console.log(product)



    const isPlantList = useNavStore((state) => state.isPlantList);
    const isOverView = useNavStore((state) => state.isOverView);
    const isAddPlants = useNavStore((state) => state.isAddPlants)



    return (
        <div className="relative w-full min-h-screen bg-[#E8ECE5] flex flex-col lg:flex-row">
            <SideBar />
            {/* main content */}

            <div className="w-full min-w-0 min-h-screen bg-[#F8F9F6] p-3 pt-18 sm:p-4 sm:pt-18 flex flex-col gap-6 lg:p-4 lg:gap-10">

                <div className="w-full h-full flex flex-col gap-7">
                    {/* top */}

                    {isOverView && (
                        <OverView />
                    )}


                    {isPlantList && (
                        <PlantListingPage />
                    )}


                    {isAddPlants && (
                        <AddListingPage />
                    )}
                </div >
            </div >
        </div >
    )
}
