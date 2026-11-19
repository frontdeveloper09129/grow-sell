import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faBox,
  faSun,
  faDroplet
} from "@fortawesome/free-solid-svg-icons";

function PlantListingPage() {
  type Product = {
    name: string,
    type_of_plants: string,
    price: number,
    description: string,
    stockQuantity: number,
    careLevel: string,
    light_requirement: string,
    water_frequency: string,
    mature_size: string,
    isAvailable: boolean
  }



  const [products, setProducts] = useState<Product[]>([])

  const ALLProducts = async () => {
    const response = await fetch('http://localhost:5000/api/v2/addListingPlants/products/getAllPlants', {
      method: "GET",
      credentials: "include"
    })


    const data = await response.json();

    if (response.ok) {
      setProducts(data.product)
      console.log(data)
    } else {
      console.log(data.inputMessage)
    }
  }
  useEffect(() => {
    ALLProducts()
  }, [])
  return (
    <main className="min-h-screen bg-[#F8F9F6] px-4 pb-8 sm:px-6 lg:px-8">
      <section className="mx-auto mt-12 max-w-7xl">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#DFE4DC] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#587655]">
              Marketplace catalogue
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#2F3A2A]">
              Plant listings
            </h2>
            <p className="mt-1 text-sm text-[#6B756C]">
              Browse all plants currently listed in your marketplace.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#EDF0E9] px-4 py-3 text-sm text-[#43523D]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <FontAwesomeIcon icon={faLeaf} />
            </span>
            <div>
              <p className="font-semibold">Plant inventory</p>
              <p className="text-xs text-[#6B756C]">Connect this count to your database</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.length === 0 ? (
            <div>
              <h3>
                there no product yet
              </h3>
            </div>
          ) : (
            products.map((plant) => (
              <article
                key={plant.name}
                className="overflow-hidden rounded-2xl border border-[#DFE4DC] bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-36 items-center justify-center bg-[#E8ECE5]">
                  <div className="flex h-18 w-18 items-center justify-center rounded-full bg-white text-3xl text-[#587655] shadow-sm">
                    <FontAwesomeIcon icon={faLeaf} />
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-[#7A8175]">{plant.type_of_plants}</p>
                      <h3 className="mt-1 text-lg font-bold text-[#2F3A2A]">{plant.name}</h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${plant.isAvailable
                        ? "bg-[#EDF0E9] text-[#43523D]"
                        : "bg-[#F4ECE9] text-[#8A5548]"
                        }`}
                    >
                      {plant.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-y border-[#E9ECE7] py-3">
                    <span className="text-lg font-bold text-[#43523D]">{plant.price}</span>
                    <span className="flex items-center gap-1.5 text-xs text-[#6B756C]">
                      <FontAwesomeIcon icon={faBox} className="text-[#587655]" />
                      {plant.stockQuantity}
                    </span>
                  </div>

                  <dl className="mt-4 grid gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#6B756C]">
                      <FontAwesomeIcon icon={faLeaf} className="w-3 text-[#587655]" />
                      <div><dt className="sr-only">Care level</dt><dd>{plant.careLevel}</dd></div>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B756C]">
                      <FontAwesomeIcon icon={faSun} className="w-3 text-[#C28B3C]" />
                      <div><dt className="sr-only">Light requirement</dt><dd>{plant.light_requirement}</dd></div>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B756C]">
                      <FontAwesomeIcon icon={faDroplet} className="w-3 text-[#5B8FA8]" />
                      <div><dt className="sr-only">Water frequency</dt><dd>{plant.water_frequency}</dd></div>
                    </div>
                  </dl>

                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl border border-[#DCE2D7] py-2.5 text-sm font-semibold text-[#43523D] transition-colors hover:bg-[#EDF0E9]"
                  >
                    View details
                  </button>
                </div>
              </article>
            ))
          )}

        </div>
      </section>
    </main>
  );
}

export default PlantListingPage;
