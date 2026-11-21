import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faLeaf, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { saleFetchData, sales_income_summary, Fecth_sales_income_product } from "../DAO/SALES.PROODUCT.FETCH.ts";
import TopSellingPlants from './topSellingProduct.tsx';





function SalesGraphAnalysis(salesIncomeSummaryData: any) {
    // calculating the y-axis side of sales analysis
    const desiredLabel = 7;
    const y_axisLabels: number[] = [];
    const maximumSalesIncome = Math.max(...salesIncomeSummaryData.map((item: any) => item.total_income));

    const rawStep = maximumSalesIncome / (desiredLabel - 1);
    const logth = Math.log10(rawStep);
    const magnitude = Math.pow(10, Math.floor(logth));
    // console.log("magnitued" + magnitude)
    const residual = rawStep / magnitude;

    let step: number;
    if (residual <= 1) step = 1 * magnitude;
    else if (residual <= 2) step = 2 * magnitude;
    else if (residual <= 5) step = 5 * magnitude;
    else step = 10 * magnitude;

    const yAxisMaximum = Math.ceil(maximumSalesIncome / step) * step;

    for (let i = 0; i <= yAxisMaximum; i += step) {
        y_axisLabels.push(i);
    }

    console.log(y_axisLabels);

    return {
        yAxisLabels: y_axisLabels,
        yAxisMaximum,
        step
    };
}

function calculateSalePercentage(saleIncomeProduct: any) {
    const result = [];


    for (let i: number = 0; i < saleIncomeProduct.length; i++) {
        const item = saleIncomeProduct[i];

        const percentage = item.total_quantity_product > 0 ? (item.quantity / item.total_quantity_product) * 100 : 0

        result.push({ ...item, percentage: Number(percentage.toFixed(2)) })
    }

    interface PlantSummary {
        name: string,
        percentage: number
        colorPercentage: string
    }

    let highest: number = 0
    let bestItem: any = null
    for (let i: number = 0; i < result.length; i++) {
        const item: any = result[i]

        if (item.percentage > highest) {
            highest = item.percentage
            bestItem = item
        }
    }

    const clamped = Math.max(0, Math.min(100, bestItem?.percentage));
    const hue = Math.round(clamped * 1.2)
    let color = `hsl(${hue}, 100%, 30%)`;

    const maximumProduct: PlantSummary | null = bestItem ? { name: bestItem.name_plants, percentage: bestItem.percentage, colorPercentage: color } : null

    console.log("percentage" + highest)


    return { result, maximumProduct }
}



function OverView() {
    const now = new Date();
    const shortMothName: string = now.toLocaleString('en-US', { month: 'short' });
    const Year: number = now.getFullYear()
    const Dates: number = now.getDate()
    const [isLoading, setLoading] = useState<boolean>(false);



    type TypeProductAnalysis = {
        totalIncome: number,
        totalProduct: number,
        productSold: number,
        changeIncome: number,
    }

    type TypeSalesAnalysisIncomeSummary = {
        week_start: Date,
        week_end: Date,
        total_income: number
    }

    type typeSaleIncomeProduct = {
        stock_quantity: number,
        name_plants: string,
        price: number,
        quantity: number,
        total_quantity_product: number,
        total_income: number
        percentage: number | null
    }

    const [product, setProduct] = useState<TypeProductAnalysis | null>(null);
    const [salesIncomeSummaryData, setSalesIncomeSummaryData] = useState<TypeSalesAnalysisIncomeSummary[]>([]);
    const [saleIncomeProduct, setSalesIncomeProduct] = useState<typeSaleIncomeProduct[]>([])
    useEffect(() => {
        async function LoadData() {
            try {

                setLoading(true);
                const data = await saleFetchData();
                setProduct(data);
                const data_summary = await sales_income_summary();
                setSalesIncomeSummaryData(data_summary.results);
                const saleProduct = await Fecth_sales_income_product();
                setSalesIncomeProduct(saleProduct);
            } catch (error) {
                console.log("error", error)
            } finally {
                setLoading(false)
            }
        }

        LoadData()
    }, [])

    const graphAnalysis = SalesGraphAnalysis(salesIncomeSummaryData);
    const percentageSalesProduct = calculateSalePercentage(saleIncomeProduct)
    const percentage = percentageSalesProduct.maximumProduct?.percentage ?? 0;
    console.log(percentageSalesProduct)

    const [barGraph, setBarGraph] = useState<boolean>(false)

    useEffect(() => {
        if (salesIncomeSummaryData.length > 0) {
            setBarGraph(false)
            const frame = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setBarGraph(true)
                })
            });

            return () => cancelAnimationFrame(frame)
        }
    }, [salesIncomeSummaryData])

    return (
        <div className='w-full max-h-160 h-full'>
            <header className="flex flex-col w-100% h-35 justify-between p-2 gap-3">
                <div className='w-100% h-auto flex justify-between p-1'>
                    <div>
                        <h1 className=" flex w-100 h-10 text-2xl font-bold">
                            Sales overview
                        </h1>

                        <p>
                            A clearer view of your plants, sales and income.
                        </p>
                    </div>

                    <div className="border border-slate-400 w-45 h-7 bg-[#ffff] rounded text-center justify-center">
                        <div className="flex gap-5 text-center justify-center">
                            <span>
                                <i className="fa-solid fa-calendar"></i>
                            </span>

                            <div className="flex gap-1">
                                <span>
                                    {shortMothName}
                                </span>

                                <p>
                                    {Dates}
                                </p>
                            </div>

                            <div className="flex text-center justify-center">
                                <p>
                                    {Year}
                                </p>

                                <i className="fa-solid fa-arrow-down size-0.5"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-100% h-full flex text-center bg-[#E8ECE5] rounded-xl gap-3 p-2'>
                    <span>
                        <FontAwesomeIcon
                            icon={faCircleInfo}
                        />
                    </span>
                    <h3 className='font-semibold'>
                        Example data · Sales analytics preview
                    </h3>

                    <p>
                        Illustrative results only; no live payments are tracked.
                    </p>
                </div>
            </header>



            {/* main content sale review */}
            <div className='w-full h-full'>
                {/* sales analysis calculating product conatiner */}
                <div className='p-2 w-full max-h-45 h-full flex justify-around gap-7'>
                    {/* total income */}
                    <div className='w-75 h-40 rounded-xl bg-[#587655]'>
                        <div className='w-full h-full flex flex-col p-2'>
                            <div className='w-full h-10 flex justify-between p-2'>
                                <p className='w-25 text-white size-1'>Total Income</p>
                                <FontAwesomeIcon className='text-white' icon={faCreditCard} />
                            </div>

                            <div className="w-full h-auto flex flex-col">
                                <div className="w-full h-auto p-2 flex flex-col gap-4 text-[#ffff]">
                                    {isLoading ? (
                                        <div className="w-full h-auto flex items-center justify-center gap-2">
                                            <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span className="text-sm text-white">Loading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-[30px] text-white">
                                                {product?.totalIncome.toLocaleString()}
                                            </span>

                                            <p>September 2026 · USD</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* total product */}
                    <div className='w-75 h-40 rounded-xl bg-[#FFFFFF]'>
                        <div className='w-full h-full flex flex-col p-2 '>
                            <div className='w-full flex justify-between p-2'>
                                <h1 className='w-full text-[#080808] size-1'>Total Product</h1>
                                <FontAwesomeIcon icon={faLeaf} className='text-[#080808]' />
                            </div>

                            <div className="w-full h-auto p-2 flex flex-col gap-4 text-[#080808]">
                                {isLoading ? (
                                    <div className="w-full h-auto flex items-center justify-center gap-4">
                                        <div className="w-7 h-7 border-4 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        <span className="text-sm text-black">Loading...</span>
                                    </div>
                                ) : (
                                    <div className='w-full justify-center flex flex-col p-2 gap-2'>
                                        <span className='text-[#080808] text-[30px]'>
                                            {product?.totalProduct ? product?.totalProduct : 0}
                                        </span>
                                        <p>Active listings · not units sold</p>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* units sold */}
                    <div className='w-75 h-40 rounded-xl bg-[#FFFFFF]'>
                        <div className='w-full h-full flex flex-col p-2'>
                            <div className='w-full h-10 flex justify-between p-2'>
                                <p className='w-25 text-black size-1'>Unit Sold</p>
                                <FontAwesomeIcon className='text-black' icon={faLeaf} />
                            </div>

                            <div className="w-full h-auto flex flex-col">
                                <div className="w-full h-auto p-2 flex flex-col gap-4 text-[#080808]">
                                    {isLoading ? (
                                        <div className="w-full h-auto flex items-center justify-center gap-2">
                                            <div className="w-7 h-7 border-4 border-black/30 border-t-black rounded-full animate-spin"></div>
                                            <span className="text-sm text-black">Loading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-[30px] text-black">
                                                {product?.productSold}
                                            </span>

                                            <p>September 2026 · USD</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* income change */}
                    <div className='w-75 h-40 round-xl bg-[#FFFFFF]'>
                        <div className='w-full h-full flex flex-col p-2'>
                            <div className='w-full h-10 flex justify-between p-2'>
                                <p className='w-full text-black size-1'>Income Changes</p>
                                <FontAwesomeIcon className='text-black' icon={faArrowTrendUp} />
                            </div>

                            <div className="w-full h-auto flex flex-col">
                                <div className="w-full h-auto p-2 flex flex-col gap-4 text-[#080808]">
                                    {isLoading ? (
                                        <div className="w-full h-auto flex items-center justify-center gap-2">
                                            <div className="w-7 h-7 border-4 border-black/30 border-t-black rounded-full animate-spin"></div>
                                            <span className="text-sm text-black">Loading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-[30px] text-black flex gap-1">
                                                <p
                                                    className={((product?.changeIncome) ?? 0) > 0 ?
                                                        "text-green-600" : "text-red-500"}>
                                                </p>
                                                {`${((product?.changeIncome) ?? 0).toFixed(2)}%`}
                                            </span>

                                            <p>vs. $10,000 in August · +$2,000</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* sales product analysis and top selling */}
                <div className="w-full h-115 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full p-4">

                    <div className="w-full min-h-full flex flex-col gap-10">

                        {/* sales analysis */}
                        <div className="w-full min-h-100 flex justify-between gap-10">

                            <div className="flex-1 min-w-0 bg-[#FFFFFF] rounded-xl border border-[#d9ddd6]">

                                <header className="w-full flex justify-between p-4">
                                    <div className="flex flex-col gap-5">
                                        <h1 className="font-bold text-xl text-gray-950">
                                            Income trend
                                        </h1>
                                        <p>September 2026 · grouped by date range</p>
                                    </div>

                                    <div>
                                        <p className="text-[15px]">income</p>
                                    </div>
                                </header>

                                {/* bar graph */}
                                <div className="w-full h-100 px-4 pb-4 overflow-x-auto">

                                    {salesIncomeSummaryData.length > 0 ? (

                                        <div className="w-full min-w-137.5 h-full flex flex-col">

                                            {/* Y-axis and graph */}
                                            <div className="flex flex-1 min-h-0">

                                                {/* Y-axis labels */}
                                                <div className="w-20 h-full flex flex-col justify-between items-end pr-3 text-xs text-gray-500">
                                                    {graphAnalysis.yAxisLabels.slice().reverse().map((label, index) => (
                                                        <span key={index}>
                                                            {label.toLocaleString()}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Graph plotting area */}
                                                <div className="flex-1 h-full relative">

                                                    {/* Horizontal grid lines */}
                                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">

                                                        {graphAnalysis.yAxisLabels.map((index) => (
                                                            <div
                                                                key={index}
                                                                className="w-full border-t border-gray-200"
                                                            />
                                                        ))}

                                                    </div>

                                                    {/* Bar columns */}
                                                    <div className="relative z-10 w-full h-full flex justify-around items-end gap-3">

                                                        {salesIncomeSummaryData.map((item, index) => {

                                                            // get the percentage of each income
                                                            const barHeight =
                                                                graphAnalysis.yAxisMaximum > 0
                                                                    ? (item.total_income / graphAnalysis.yAxisMaximum) * 100
                                                                    : 0;

                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                                                                >

                                                                    {/* Income value */}
                                                                    <span className="text-xs text-gray-600 font-medium">
                                                                        {item.total_income.toLocaleString()}
                                                                    </span>

                                                                    {/* Bar */}
                                                                    <div
                                                                        className="w-full max-w-14  bg-[#587655] rounded-t-md transition-[height duration-500 ease-in-out"
                                                                        style={{
                                                                            height: barGraph ? `${barHeight}%` : "0%"
                                                                        }}
                                                                    />

                                                                </div>
                                                            );
                                                        })}

                                                    </div>

                                                </div>

                                            </div>

                                            {/* X-axis labels */}
                                            <div className="flex ml-20 mt-3">

                                                {salesIncomeSummaryData.map((item, index) => {

                                                    const startDate: any = new Date(item?.week_start).toLocaleDateString("en-PH", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric"
                                                    })
                                                    const endDate: any = new Date(item?.week_end).toLocaleDateString("en-PH", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric"
                                                    })

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex-1 text-center text-xs text-gray-500"
                                                        >
                                                            <span>
                                                                {startDate}
                                                            </span>

                                                            <span className="block text-[10px]">
                                                                {endDate}
                                                            </span>
                                                        </div>
                                                    );
                                                })}

                                            </div>

                                        </div>

                                    ) : (

                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No income data available
                                        </div>

                                    )}

                                </div>


                            </div>

                            <div className="w-100 shrink-0 bg-[#FFFFFF] rounded-xl border border-[#d9ddd6] flex flex-col gap-4 p-2">
                                <header className='flex flex-col p-4'>
                                    <h1 className='text-[17px] font-medium'>Share income</h1>
                                    <p className='text-[15px]'>Product contribution · September 2026</p>
                                </header>


                                <div className="w-full max-h-100 h-full justify-center text-center">
                                    <div className="w-full h-auto flex items-center gap-4 p-4">

                                        {/* 1. Outer circle: add 'relative' and 'overflow-hidden' */}
                                        <div className="relative w-48 h-48 rounded-full flex items-center justify-center overflow-hidden">

                                            {/* 2. Colored fill: add 'absolute bottom-0', 'w-full', and background color */}
                                            <div
                                                className="absolute bottom-0 left-0 w-full bg-amber-500 transition-all duration-300"
                                                style={{
                                                    height: `${192 * (percentage / 100)}px`,
                                                    backgroundColor: percentageSalesProduct.maximumProduct?.colorPercentage
                                                }}
                                            ></div>

                                            {/* 3. Inner white circle: replace 'fixed' with 'relative z-10' and 'bg-white' */}
                                            <div className="relative z-10 w-40 h-40 rounded-full bg-white flex items-center justify-center">
                                                <span className="font-bold text-gray-700">{percentage}%</span>
                                            </div>

                                        </div>

                                        <div className="flex flex-col justify-center items-start gap-1">
                                            <p className="text-[15px]">Largest contributor</p>
                                            <h1 className="font-bold">
                                                {percentageSalesProduct.maximumProduct?.name?.toUpperCase()}
                                            </h1>
                                            <p>
                                                <span
                                                    className="text-[20px] font-bold"
                                                    style={{ color: percentageSalesProduct.maximumProduct?.colorPercentage }}
                                                >
                                                    {`${percentage}%`}
                                                </span>
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* top sellings analysis */}
                        <div className="w-full min-h-100 bg-[#FFFFFF] rounded-xl border border-[#d9ddd6]">
                            <TopSellingPlants />
                        </div>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default OverView;