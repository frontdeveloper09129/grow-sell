
export const saleFetchData = async () => {
    // 1. Grab the base URL
    const API_BASE = import.meta.env.VITE_SALESANALYSIS_API_URL;
    console.log(API_BASE)


    try {
        const Response = await fetch(`${API_BASE}/sale_analysis/product`, {
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
    const API_BASE = import.meta.env.VITE_SALESANALYSIS_API_URL;

    try {
        const Response = await fetch(`${API_BASE}/sales_income_summary`, {
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
    const API_BASE = import.meta.env.VITE_SALESANALYSIS_API_URL;


     try {
        const Response = await fetch(`${API_BASE}/sales/get/product`, {
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
