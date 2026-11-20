
export const saleFetchData = async () => {
    // 1. Grab the base URL
    const AUTH_API:any = import.meta.env.VITE_AUTH_API_URL === 'true';
    const API_URL = AUTH_API ? "https://grow-sell-1.onrender.com" : "http://localhost:5000";


    try {
        const Response = await fetch(`${API_URL}/api/v2/addListingPlants/sale_analysis/product`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!Response.ok) {
            const errorText = await Response.text();
            console.error(`Server Error (${Response.status}):`, errorText);
            throw new Error(`HTTP error! Status: ${Response.status}`);
        }

        const data = await Response.json();
        return data;

    } catch (error) {
        console.log("Network or Parsing error:", error);
        throw error;
    }
}


export const sales_income_summary = async () => {
    const AUTH_API:any = import.meta.env.VITE_AUTH_API_URL === 'true';
    const API_URL = AUTH_API ? "https://grow-sell-1.onrender.com" : "http://localhost:5000";

    try {
        const Response = await fetch(`${API_URL}/api/v2/addListingPlants/sales_income_summary`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!Response.ok) {
            const errorText = await Response.text();
            console.error(`Server Error (${Response.status}):`, errorText);
            throw new Error(`HTTP error! Status: ${Response.status}`);
        }

        const data = await Response.json();


        return data
    } catch (error) {
        console.log("Network or Parsing error:", error);
        throw error;
    }
}


export const Fecth_sales_income_product = async () => {
    const AUTH_API:any = import.meta.env.VITE_AUTH_API_URL === 'true';
    const API_URL = AUTH_API ? "https://grow-sell-1.onrender.com" : "http://localhost:5000";


     try {
        const Response = await fetch(`${API_URL}/api/v2/addListingPlants/sales/get/product`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!Response.ok) {
            const errorText = await Response.text();
            console.error(`Server Error (${Response.status}):`, errorText);
            throw new Error(`HTTP error! Status: ${Response.status}`);
        }

        const data = await Response.json();


        return data.product || []
    } catch (error) {
        console.log("Network or Parsing error:", error);
        throw error;
    }

}
