import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"; 
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export  function Headers() {
    const navigate = useNavigate();
    return (
        <div>
             <header className="w-full pt-7 p-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    {/* left */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Marketplace overvie</h1>
                        <p className="text-[#6B756C] text-[12px]">Manage plant listings and buyer inquiries for your marketplace.</p>
                    </div>

                    {/* right */}
                    <div className="flex w-full gap-3 items-center sm:w-auto sm:gap-4">
                        <div className="relative min-w-0 flex-1 sm:w-48 sm:flex-none sm:max-w-xs">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>

                            <input
                                className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#FFFFFF] text-[13px] border border-gray-200 outline-none focus:border-[#587655]"
                                type="search"
                                name="search"
                                placeholder="Search plants"
                            />
                        </div>

                        <button
                            onClick={() => navigate('/planst/owners/shop/addListingPage')}
                            className="bg-[#587655] text-white w-28 h-9 rounded-xl text-[13px] flex items-center justify-center gap-1.5 shrink-0">
                            <FontAwesomeIcon icon={faPlus} /> Add listing
                        </button>
                    </div>
                </header>
        </div>
    )
}
