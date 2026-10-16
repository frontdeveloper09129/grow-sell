import { SideBar } from "../components/components.sidebar";

function AddListingPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F3F5F1]">

      {/* Sidebar */}
      <aside className="w-70 shrink-0 overflow-y-auto bg-[#E8ECE5]">
        <SideBar />
      </aside>

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
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Plant type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tropical houseplant"
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 45.00"
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Stock quantity
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 12"
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
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
                  className="mt-1.5 w-full resize-y rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#34412F]">
                  Plant photo
                </label>
                <label className="mt-1.5 flex min-h-30 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#D5DDD0] bg-[#EDF0E9]/70 p-4 hover:bg-[#E5EADF]">
                  <span className="text-lg text-[#587655]">↑</span>
                  <span className="text-sm font-semibold text-[#354231]">
                    Choose image
                  </span>
                  <span className="mt-1 text-xs text-[#7A8175]">
                    Browse files from your device
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 block w-full max-w-50 text-xs"
                  />
                </label>
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
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Light requirement
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bright indirect"
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Water frequency
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Water weekly"
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34412F]">
                    Mature size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4–6 ft tall"
                    className="mt-1.5 w-full rounded-lg border border-[#DCE2D7] bg-[#EDF0E9] px-3 py-2.5 text-sm outline-none focus:border-[#587655]"
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
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-[#354231]">
                  Monstera Deliciosa
                </h3>
                <p className="mt-1 text-[10px] text-[#7A8175]">
                  Tropical houseplant • ₱45.00 • 12 in stock
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-[#DCE2D7] bg-white px-2 py-1 text-[10px] text-[#43523D]">
                Available
              </span>
            </div>

            {/* Plant 2 */}
            <div className="mb-2.5 flex items-center justify-between gap-3 rounded-lg border border-[#DCE2D7] bg-[#EDF0E9]/80 p-3">
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-[#354231]">
                  Snake Plant Laurentii
                </h3>
                <p className="mt-1 text-[10px] text-[#7A8175]">
                  Low-maintenance houseplant • ₱28.00 • 8 in stock
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-[#DCE2D7] bg-white px-2 py-1 text-[10px] text-[#43523D]">
                Available
              </span>
            </div>

            {/* Plant 3 */}
            <div className="mb-2.5 flex items-center justify-between gap-3 rounded-lg border border-[#DCE2D7] bg-[#EDF0E9]/80 p-3">
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-[#354231]">
                  Philodendron Birkin
                </h3>
                <p className="mt-1 text-[10px] text-[#7A8175]">
                  Collector houseplant • ₱38.00 • 5 in stock
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-[#DCE2D7] bg-white px-2 py-1 text-[10px] text-[#43523D]">
                Available
              </span>
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