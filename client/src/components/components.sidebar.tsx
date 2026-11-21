import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faMessage, faUserFriends, faGear, faBox, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useNavStore } from "../store/store";

export function SideBar() {
    useEffect(() => {
        Profile();
    }, [])


    const setPlantList = useNavStore((state) => state.setPlantList)
    const isplantList = useNavStore((state) => state.isPlantList)
    const isOverview = useNavStore((state => state.isOverView))
    const setOverview = useNavStore((state => state.setOverView))
    const isBuyers = useNavStore((state => state.isBuyers))
    const setBuyers = useNavStore((state => state.setBuyers))
    const isPlantOwners = useNavStore((state => state.isPlantOwners))
    const setPlantOwners = useNavStore((state => state.setPlantOwners))
    const isSettings = useNavStore((state => state.isSetting))
    const setSettings = useNavStore((state => state.setSetting))
    const setAddPlants = useNavStore((state => state.setAddPlants))
    const isAddPlants = useNavStore((state => state.isAddPlants))

    function ListHandleClick(index: number) {
        if (index === 0) {
            setOverview(true);
            setPlantList(false);
            setBuyers(false);
            setPlantOwners(false);
            setSettings(false);
            setAddPlants(false)
        } else if (index === 1) {
            setOverview(false);
            setPlantList(true);
            setBuyers(false);
            setPlantOwners(false);
            setSettings(false);
            setAddPlants(false)
        } else if (index === 2) {
            setOverview(false);
            setPlantList(false);
            setBuyers(true);
            setPlantOwners(false);
            setSettings(false);
            setAddPlants(false)
        } else if (index === 3) {
            setOverview(false);
            setPlantList(false);
            setBuyers(false);
            setPlantOwners(true);
            setSettings(false);
            setAddPlants(false)
        } else if (index === 4) {
            setOverview(false);
            setPlantList(false);
            setBuyers(false);
            setPlantOwners(false);
            setSettings(true);
            setAddPlants(false)
        } else if (index === 5) {
            setOverview(false);
            setPlantList(false);
            setBuyers(false);
            setPlantOwners(false);
            setSettings(false);
            setAddPlants(true)
        }
    }

    type List = {
        overview?: string;
        plantList?: string;
        buyers?: string;
        plantOwners?: string;
        settings?: string;
        icon: IconDefinition;
        isCorrect: boolean,
        Addplants?: string,
    };

    const list: List[] = [
        {
            overview: "Overview",
            icon: faBox,
            isCorrect: isOverview
        },

        {
            plantList: "Plant Listings",
            icon: faLeaf,
            isCorrect: isplantList
        },
        {
            buyers: "Buyers",
            icon: faMessage,
            isCorrect: isBuyers
        },
        {
            plantOwners: "Plant owners",
            icon: faUserFriends,
            isCorrect: isPlantOwners
        },
        {
            settings: "Settings",
            icon: faGear,
            isCorrect: isSettings
        },

        {
            Addplants: "Add Plants",
            icon: faLeaf,
            isCorrect: isAddPlants
        }
    ];

    const [profileName, SetProfileName] = useState<string>("")
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const Profile = async () => {
        const AUTH_API: any = import.meta.env.VITE_AUTH_API_URL === 'true';
        const API_URL = AUTH_API ? "https://grow-sell-server.onrender.com" : "http://localhost:5000";
        console.log(API_URL)
        try {
            const response = await fetch(`${API_URL}/api/v1/auth/me`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "applicatio/json"
                }
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data.message)
                SetProfileName(data.username)
            } else {
                console.log(data.message)
            }

        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className="fixed inset-x-0 top-0 z-50 w-full shrink-0 lg:static lg:w-auto">

            <div className="relative z-10 flex items-center justify-between p-4 lg:hidden">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#587655] flex justify-center items-center text-center rounded-xl">
                        <h1 className="text-[#FFFFFF] text-sm">P</h1>
                    </div>
                    <h1 className="text-[#2F3A2A]">Grow Selling</h1>
                </div>

                <button
                    type="button"
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((open) => !open)}
                    className="w-10 h-10 rounded-xl bg-[#FFFFFF] flex items-center justify-center text-[#2F3A2A]"
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                </button>
            </div>

            {isMenuOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 z-0 bg-[#2F3A2A]/35 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside className={`${isMenuOpen ? "flex" : "hidden"} relative z-10 max-h-[calc(100svh-72px)] w-full shrink-0 flex-col gap-4 overflow-y-auto bg-[#E8ECE5] p-4 shadow-sm lg:max-h-none lg:flex lg:min-h-screen lg:max-w-75 lg:overflow-visible lg:bg-transparent lg:p-5 lg:gap-10 lg:shadow-none`}>
                <div className="hidden w-full gap-4 lg:flex">
                    <div className="w-12.5 h-12.5 bg-[#587655] flex justify-center items-center text-center rounded-xl">
                        <h1 className="text-[#FFFFFF] text-sm">P</h1>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-[#2F3A2A]">Grow Selling</h1>
                        <p className="text-[#6B756C] text-sm">Owner of Dashboard</p>
                    </div>
                </div>

                <div className="bg-[#FFFFFF] w-full lg:w-64 h-16 rounded-2xl flex items-center p-3 shadow-sm border border-gray-100">
                    <div className="bg-[#D9D9D9] w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shrink-0">
                        <h1>{profileName?.[0]?.toLocaleUpperCase() || "U"}</h1>
                    </div>
                    <div className="ml-3 flex flex-col justify-center">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">{profileName ? profileName : "user not found"}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Marketplace Owner</p>
                    </div>
                </div>
                <div className="w-full lg:w-57 h-full flex items-center justify-center">
                    <nav className="w-full h-full flex flex-col gap-4 lg:gap-7">
                        <ul className="flex flex-col gap-2">
                            {list.map((item: any, index: number) => {
                                const label =
                                    item.overview ??
                                    item.plantList ??
                                    item.buyers ??
                                    item.plantOwners ??
                                    item.settings ?? item.Addplants;

                                return (
                                    <li
                                        key={index}
                                        className={`w-full h-10.5 rounded-xl flex items-center p-3 lg:p-4 text-sm gap-2 cursor-pointer transition-colors duration-300 ease-in-out
                                                   ${item.isCorrect ? "bg-[#ffff]" : ""}
                                               `}
                                        onClick={() => {
                                            ListHandleClick(index)
                                            setIsMenuOpen(false)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={item.icon} />
                                        <span>{label}</span>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="bg-[#ffff] rounded-xl w-full h-40 flex flex-col p-2 gap-2">
                            <h1 className="text-l text-[#080808]"><strong>Future roadmap</strong></h1>
                            <p className="text-[12px]">
                                Checkout and in-app purchasing are planned for the shop pages, but the current focus is on listing management and buyer outreach.
                            </p>
                        </div>
                    </nav>
                </div>
            </aside>
        </div>
    )
}
