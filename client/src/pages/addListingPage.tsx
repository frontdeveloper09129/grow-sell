import { useState, useEffect } from "react";

function AddListingPage() {

  // form state
  const [name, setName] = useState<string>("");
  const [typeOfPlants, setTypeOfPlants] = useState<string>("");
  const [Price, setPrice] = useState<number>(0);
  const [StockQuantity, setStockQuantity] = useState<number>(0);
  const [Cogs, setCogs] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [careLevel, setCareLevel] = useState<string>("");
  const [light, setLight] = useState<string>("");
  const [waterFrequency, setWaterFrequency] = useState<string>("");
  const [matureSize, setMatureSize] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const handleFormData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/v2/addListingPlants/products/addlisting_plants", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json" // Ensure this is fixed!
        },
        body: JSON.stringify({
          name,
          types_of_plants: typeOfPlants,
          price: Price,
          stock_quantity: StockQuantity,
          Cogs,
          description,
          care_level: careLevel,
          light_requirement: light,
          water_frequency: waterFrequency,
          mature_size: matureSize,
          is_available: isAvailable
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success message from backend:", data.message);
        console.log("Data:", data.product);
        updated()
        Fetchproduct();


      } else {
        console.warn("Backend validation/error message:", data.message);
      }

    } catch (error) {
      console.error("The request failed completely before reaching or returning from the backend:", error);
    }


    function updated() {
      setName(""), setPrice(0), setTypeOfPlants(""), setStockQuantity(0), setDescription(""), setCogs(0), setCareLevel("")
    }

  };



  interface Product {
    id: number;
    name: string;
    types_of_plants: string;
    price: number;
    stock_quantity: number;
    cogs: number
    description: string;
    care_level: string | null;
    light_requirement: string | null;
    water_frequency: string | null;
    mature_size: string | null;
    is_available: boolean;
  }

  const [product, setProduct] = useState<Product[]>([]);

  const Fetchproduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v2/addListingPlants/products/getAllPlants", {
        method: "GET",
        credentials: "include",
      })

      const data = await response.json();

      if (response.ok) {

        if (Array.isArray(data.product)) {
          setProduct(data.product)
        } else {
          setProduct(data.product)
        }
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    Fetchproduct();
  }, [])



  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F3F5F1]">
      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden p-5 lg:p-6">

        {/* Header: stays fixed, does not scroll */}
        <header className="mb-5 flex shrink-0 items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#292E27]">
              Add new plant listing
            </h1>

            <p className="mt-1 text-xs text-[#7A8175]">
              Complete the form below to add another plant to your marketplace inventory.
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-1.5 text-xs font-medium text-[#43523D]">
            Draft listing
          </span>
        </header>

        {/* Only this content area takes the remaining height */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden xl:grid-cols-[1.15fr_0.95fr]">

          {/* Left: Form scrolls independently */}
          <section className="min-h-0 min-w-0 overflow-y-auto rounded-xl border border-[#DFE4DC] bg-white p-5">

            {/* Keep your complete plant form here */}
            <h2 className="text-base font-semibold text-[#354231]">
              Plant details
            </h2>

            <p className="mt-1 text-xs text-[#7A8175]">
              Use the fields below to capture the plant information buyers will see in your marketplace.
            </p>

            <form className="mt-5 space-y-4">

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Plant name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Monstera Deliciosa"
                    value={name}
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Plant type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tropical houseplant"
                    value={typeOfPlants}
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setTypeOfPlants(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 45.00"
                    value={Price}
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Cost of product
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 45.00"
                    value={Cogs}
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setCogs(e.target.valueAsNumber)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Stock quantity
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 12"
                    value={StockQuantity}
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setStockQuantity(e.target.valueAsNumber)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#34412F]">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Add a short description of the plant, its growth stage, and any care notes buyers should know before purchase."
                  value={description}
                  className="mt-1.5 w-full resize-y rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#354231]">
                  Care requirements
                </h3>
                <p className="mt-1 text-xs text-[#7A8175]">
                  Help buyers understand how much attention this plant needs.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Care level
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Beginner friendly"
                    value={careLevel}
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setCareLevel(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Light requirement
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bright indirect"
                    value={light}
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setLight(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Water frequency
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Water weekly"
                    value={waterFrequency}
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setWaterFrequency(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Mature size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4–6 ft tall"
                    value={matureSize}
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setMatureSize(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#354231]">
                  Availability
                </h3>
                <p className="mt-1 text-xs text-[#7A8175]">
                  Set whether this listing should appear in the marketplace immediately.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Availability
                  </label>
                  <select
                    defaultValue="true"
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                    onChange={(e) => setIsAvailable(e.target.value === "true")}
                  >
                    <option value="true">Available now</option>
                    <option value="false">Unavailable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Created / updated
                  </label>
                  <input
                    type="text"
                    value="Auto-generated by grow selling"
                    readOnly
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm text-[#81897D]"
                  />
                </div>
              </div>

              <p className="text-xs text-[#7A8175]">
                Created and updated timestamps are generated automatically.
              </p>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  className="rounded-lg border border-[#DCE2D7] px-4 py-2 text-xs font-semibold text-[#354231] hover:bg-[#F3F5F1]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#587655] px-4 py-2 text-xs font-semibold text-white hover:bg-[#456243]"
                  onClick={handleFormData}
                >
                  Save plant listing
                </button>
              </div>

            </form>
          </section>

          {/* Right: Previously Added Plants scroll independently */}
          <section className="min-h-0 min-w-0 overflow-y-auto rounded-xl border border-[#DFE4DC] bg-white p-5">

            <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold text-[#354231]">
                  Previously added plants
                </h2>
                <p className="mt-1 text-xs text-[#7A8175]">
                  Sample content — replace with real marketplace records.
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-[#EDF0E9] px-2.5 py-1 text-[10px] font-semibold text-[#43523D]">
                3 sample records
              </span>
            </div>

            <div className="mb-3 flex items-center justify-between border-b border-[#E1E6DE] pb-2 text-xs font-medium text-[#65705F]">
              <span>Plant</span>
              <span>Status</span>
            </div>

            {/* Plant 1 */}
            <div className="mb-2.5 flex items-center justify-between gap-3 rounded-lg border border-[#DCE2D7] bg-[#EDF0E9]/80 p-3">
              {product.length === 0 ? (
                <div className="w-full flex justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-[#354231">no product exist yet</h3>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-2"> {/* Optional: Wrapper div if you are rendering multiple items */}
                  {product.map((value, index) => (
                    <div className="w-full flex justify-between" key={index}>
                      <div>
                        <h3 className="text-xs font-semibold text-[#354231]">{value.name}</h3>
                        <p className="mt-1 text-[10px] text-[#7A8175]">{value.price}</p>
                      </div>
                      <span className="shrink-0 rounded-full border border-[#DCE2D7] bg-white px-2 py-1 text-[10px] text-[#43523D]">
                        {value.is_available ? "available" : "unavailable"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Note */}

            <div className="mt-3 rounded-lg border border-[#DCE2D7] bg-[#EDF0E9]/80 p-3">
              <h3 className="text-xs font-semibold text-[#354231]">
                Sample content note
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#7A8175]">
                This list should be populated with the actual plant listings
                already added to your marketplace. Use the form on the left
                to add another plant, then review the live inventory here.
              </p>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}

export default AddListingPage;