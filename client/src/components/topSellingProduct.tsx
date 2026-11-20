import { useState, useEffect } from "react";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function TopSellingPlants() {

    type TopSellingProductType = {
        product_id: number;
        stock_quantity: number;
        total_quantity_product: number;
        name_plants: string;
        price: string;
        quantity: string;
        total_income: string;
        salesPercentage: number;
    };

    const [products, setProducts] = useState<TopSellingProductType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {

        async function FetchTopSellingProducts() {
            const AUTH_API: any = import.meta.env.VITE_AUTH_API_URL === 'true';
            const API_URL = AUTH_API ? "https://grow-sell-1.onrender.com" : "http://localhost:5000";

            try {

                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `${API_URL}/api/v2/addListingPlants/getTopSelling/sales/product`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch top-selling products");
                }

                const data = await response.json();

                setProducts(data.products || []);

            } catch (error) {

                console.error("Top selling products error:", error);

                setError("Unable to load top-selling products.");

            } finally {

                setIsLoading(false);

            }
        }

        FetchTopSellingProducts();

    }, []);

    // Calculate total units sold
    const totalUnitsSold = products.reduce(
        (total, item) => total + Number(item.quantity),
        0
    );

    // Calculate combined income
    const totalIncome = products.reduce(
        (total, item) => total + Number(item.total_income),
        0
    );

    // Currency formatter
    const formatCurrency = (value: number) => {

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }).format(value);

    };

    return (

        <div className="w-full min-h-100 bg-white rounded-xl border border-[#d9ddd6] flex flex-col">

            {/* Header */}
            <header className="w-full flex justify-between items-center p-5">

                <div className="flex flex-col gap-1">

                    <h1 className="text-lg font-bold text-gray-900">
                        Top-selling plants
                    </h1>

                    <p className="text-xs text-gray-500">
                        Ranked by income · Top-selling product listings
                    </p>

                </div>

                <div className="bg-[#E8ECE5] text-[#587655] px-3 py-2 rounded-full text-xs font-semibold">

                    {totalUnitsSold.toLocaleString()} units sold

                </div>

            </header>

            {/* Loading */}
            {isLoading ? (

                <div className="w-full flex-1 min-h-60 flex flex-col justify-center items-center gap-3">

                    <div className="w-8 h-8 border-4 border-[#587655]/20 border-t-[#587655] rounded-full animate-spin" />

                    <p className="text-sm text-gray-500">
                        Loading top-selling plants...
                    </p>

                </div>

            ) : error ? (

                <div className="w-full flex-1 min-h-60 flex justify-center items-center text-sm text-red-500">
                    {error}
                </div>

            ) : products.length === 0 ? (

                <div className="w-full flex-1 min-h-60 flex justify-center items-center text-sm text-gray-400">
                    No selling products available.
                </div>

            ) : (

                /* Product Table */
                <div className="w-full overflow-x-auto px-4 pb-4">

                    <div className="min-w-[850px]">

                        {/* Table Header */}
                        <div className="grid grid-cols-[35px_minmax(180px,1.5fr)_100px_100px_120px_minmax(130px,1fr)] gap-3 items-center border-b border-[#e5e9e3] py-3 px-2 text-[10px] uppercase tracking-wide text-gray-500">

                            <span>#</span>

                            <span>Product</span>

                            <span className="text-center">
                                Units sold
                            </span>

                            <span className="text-center">
                                Unit price
                            </span>

                            <span className="text-right">
                                Income
                            </span>

                            <span>
                                Share of income
                            </span>

                        </div>

                        {/* Product Rows */}
                        {products.map((item, index) => {

                            const income = Number(item.total_income)

                            const incomeShare = totalIncome > 0
                                ? (income / totalIncome) * 100
                                : 0;

                            return (

                                <div
                                    key={item.product_id}
                                    className="grid grid-cols-[35px_minmax(180px,1.5fr)_100px_100px_120px_minmax(130px,1fr)] gap-3 items-center py-3 px-2 border-b border-[#e5e9e3] hover:bg-[#f8faf7] transition-colors"
                                >

                                    {/* Ranking */}
                                    <span className="text-xs text-gray-500">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Plant Name */}
                                    <div className="flex items-center gap-3 min-w-0">

                                        <div className="w-10 h-10 shrink-0 rounded-lg bg-[#E8ECE5] flex items-center justify-center">

                                            <FontAwesomeIcon
                                                icon={faLeaf}
                                                className="text-[#587655] text-lg"
                                            />

                                        </div>

                                        <div className="flex flex-col min-w-0">

                                            <span className="text-sm font-semibold text-gray-800 truncate capitalize">
                                                {item.name_plants}
                                            </span>

                                            <span className="text-[10px] text-gray-400">
                                                Plant listing
                                            </span>

                                        </div>

                                    </div>

                                    {/* Units Sold */}
                                    <span className="text-sm text-gray-700 text-center">
                                        {Number(item.quantity).toLocaleString()}
                                    </span>

                                    {/* Unit Price */}
                                    <span className="text-sm text-gray-600 text-center">
                                        {formatCurrency(Number(item.price))}
                                    </span>

                                    {/* Total Income */}
                                    <span className="text-sm font-semibold text-gray-800 text-right">
                                        {formatCurrency(income)}
                                    </span>

                                    {/* Income Percentage */}
                                    <div className="flex items-center gap-2">

                                        <div className="flex-1 h-2 bg-[#E8ECE5] rounded-full overflow-hidden">

                                            <div
                                                className="h-full bg-[#587655] rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${incomeShare}%`
                                                }}
                                            />

                                        </div>

                                        <span className="text-xs text-gray-600 w-10 text-right">
                                            {incomeShare.toFixed(1)}%
                                        </span>

                                    </div>

                                </div>

                            );

                        })}

                        {/* Table Footer */}
                        <div className="grid grid-cols-[35px_minmax(180px,1.5fr)_100px_100px_120px_minmax(130px,1fr)] gap-3 items-center py-4 px-2">

                            <span></span>

                            <span className="text-xs font-bold text-gray-800">
                                Total sales
                            </span>

                            <span className="text-sm font-bold text-gray-800 text-center">
                                {totalUnitsSold.toLocaleString()}
                            </span>

                            <span className="text-xs text-gray-400 text-center">
                                —
                            </span>

                            <span className="text-sm font-bold text-gray-800 text-right">
                                {formatCurrency(totalIncome)}
                            </span>

                            <span className="text-xs font-bold text-gray-800 text-right">
                                {totalIncome > 0 ? "100.0%" : "0.0%"}
                            </span>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


export default TopSellingPlants