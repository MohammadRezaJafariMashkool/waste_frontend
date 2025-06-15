import { useEffect, useState } from 'react';
import data from '../Assets/data.json';
import { ArrowRight, AlertTriangle, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SelectSkip = () => {

  // --- State for price filtering ---
  const [price, setPrice] = useState(0);         // Current maximum price selected by the user
  const [maxPrice, setMaxPrice] = useState(0);   // Upper limit of price range (from data)
  const [minPrice, setMinPrice] = useState(0);   // Lower limit of price range (from data)

  // --- UI & Filter States ---
  const [showFilters, setShowFilters] = useState(false); // Controls visibility of filter section
  const [selectedSize, setSelectedSize] = useState('');  // Selected skip size (dropdown filter)
  const [onlyOnRoad, setOnlyOnRoad] = useState(false);   // Toggle: only skips allowed on road
  const [sortBy, setSortBy] = useState('popularity');    // Current sort option
  const [filteredItems, setFilteredItems] = useState([]); // List of skips after filtering/sorting

  // --- Pagination ---
  const [visibleCount, setVisibleCount] = useState(6);   // How many items to show initially

  // --- Set price range when data is loaded ---
  useEffect(() => {
    if (data.length > 0) {
      const min = Math.min(...data.map(item => calculatePrice(item))); // Calculate minimum price
      const max = Math.max(...data.map(item => calculatePrice(item))); // Calculate maximum price

      setPrice(max);      // Set slider value to max by default (show all items)
      setMaxPrice(max);   // Save upper limit for slider
      setMinPrice(min);   // Save lower limit for slider
    }
  }, [data]);

  // --- Filter and sort data reactively (with debounce) ---
  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = data
        .filter((item) => {
          // Filter by selected size (if selected)
          if (selectedSize && String(item.size) !== selectedSize) return false;

          // Filter out skips not allowed on the road if checkbox is active
          if (onlyOnRoad && !item.allowed_on_road) return false;

          // Filter by current price range slider value
          if (calculatePrice(item) > price) return false;

          return true;
        })
        .sort((a, b) => {
          // Sorting logic
          if (sortBy === 'price') return calculatePrice(a) - calculatePrice(b);               // Price: Low to High
          if (sortBy === 'priceHighToLow') return calculatePrice(b) - calculatePrice(a);     // Price: High to Low
          if (sortBy === 'size') return a.size - b.size;                                     // Size: Low to High
          if (sortBy === 'sizeHighToLow') return b.size - a.size;                            // Size: High to Low
          if (sortBy === 'popularity') {
            // Recommended skips first
            if (a.recommended && !b.recommended) return -1;
            if (!a.recommended && b.recommended) return 1;
          }

          // Fallback: show available skips first
          const aAvailable = a.allowed_on_road && !a.not_suitable_for_heavy_waste;
          const bAvailable = b.allowed_on_road && !b.not_suitable_for_heavy_waste;
          if (aAvailable && !bAvailable) return -1;
          if (!aAvailable && bAvailable) return 1;

          return 0; // No preference
        });

      setFilteredItems(filtered); // Apply filtered & sorted result
    }, 800); // Add debounce delay to reduce rapid filtering on fast input

    return () => clearTimeout(handler); // Cleanup debounce on dependency change
  }, [price, selectedSize, onlyOnRoad, sortBy, data]);

  // --- Utility: Calculates price including VAT ---
  const calculatePrice = (item) =>
    Math.round(item.price_before_vat * (1 + item.vat / 100));

  // --- Utility: Builds image URL based on skip size ---
  const getImageUrl = (size) =>
    `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;


  return (
    <div className="sticky top-0 z-50 max-w-7xl mx-auto px-4 pb-32 padding-top">

      {/* Title and description */}
      <h2 className="text-2xl font-bold text-center mb-4">Choose Your Skip Size</h2>
      <p className='text-gray-100 text-center mb-8'>Select the skip size that best suits your needs</p>

      {/* Filter controls container */}
      <div className="py-1 mb-4 w-full sticky top-0 z-50 bg-[#121212]">

        {/* Toggle button for showing/hiding filters */}
        <button
          className="my-4 px-4 py-2 rounded-md bg-[#0037C1] text-white font-semibold flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-5 h-5" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters section, conditionally rendered */}
        {showFilters && (
          <div className="py-4 w-full">

            {/* Responsive grid layout for filters */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">

              {/* Skip size dropdown filter */}
              <select
                className="p-2 rounded-md bg-[#2A2A2A] text-white border border-[#444] w-full"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">All Sizes</option>
                <option value="4">4 Yards</option>
                <option value="6">6 Yards</option>
                <option value="8">8 Yards</option>
                <option value="10">10 Yards</option>
                <option value="12">12 Yards</option>
                <option value="16">16 Yards</option>
                <option value="20">20 Yards</option>
                <option value="40">40 Yards</option>
              </select>

              {/* Checkbox for filtering skips that are road-allowed */}
              <label className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  className="accent-[#0037C1]"
                  checked={onlyOnRoad}
                  onChange={(e) => setOnlyOnRoad(e.target.checked)}
                />
                <span>Only skips allowed on the road</span>
              </label>

              {/* Price range slider */}
              <div className="flex flex-col space-y-1 text-white w-full">
                <div className="flex items-center space-x-2">
                  <span>£{minPrice}</span>
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full accent-[#0037C1]"
                  />
                  <span>£{price}</span>
                </div>
              </div>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 rounded-md bg-[#2A2A2A] text-white border border-[#444] w-full"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price">Price (Low to High)</option>
                <option value="priceHighToLow">Price (High to Low)</option>
                <option value="size">Size (Low to High)</option>
                <option value="sizeHighToLow">Size (High to Low)</option>
              </select>

            </div>
          </div>
        )}
      </div>

      {/* Grid layout for skip items, with animation support */}
      <AnimatePresence>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {filteredItems.slice(0, visibleCount).map((item) => (
            <motion.div
              key={item.id}
              className={`group relative rounded-lg border-2 p-4 md:p-6 transition duration-300 ease-in-out
                    border-[#2A2A2A] hover:border-[#0037C1]/50 hover:shadow-lg hover:scale-[1.01]
                    bg-[#2A2A2A] text-white shadow-md
                    ${item.recommended ? 'border-yellow-400' : ''}
                  `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.90 }}
            >

              {/* Image + status badges */}
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-md mb-4">
                  <img
                    src={getImageUrl(item.size)}
                    alt={`${item.size} Yard Skip`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Highlight badge for recommended items */}
                  {item.recommended && (
                    <div className="absolute top-3 left-2 z-20 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      ⭐ Recommended
                    </div>
                  )}
                </div>

                {/* Size badge */}
                <div className="absolute top-3 right-2 z-20 bg-[#0037C1] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                  {item.size} Yards
                </div>

                {/* Warning label if not allowed on road */}
                <div className="absolute bottom-3 left-2 z-20 space-y-2">
                  {!item.allowed_on_road && (
                    <div
                      className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2"
                      title="This skip cannot be placed on public roads due to local council restrictions."
                      style={{ cursor: 'help' }}
                    >
                      <AlertTriangle className="text-xs text-yellow-500 w-4 h-4" />
                      <span className="text-xs text-yellow-500 bg-black/80">
                        Not Allowed on the Road
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                {item.size} Yard Skip
              </h3>

              {/* Price and hire period */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-xl md:text-2xl font-bold text-[#0037C1]">
                    £{calculatePrice(item)}
                  </span>
                </div>
              </div>

              {/* Hire period description */}
              <p className="text-sm text-gray-100 mb-4 md:mb-6">
                {item.hire_period_days} day hire period
              </p>

              {/* Call-to-action button (disabled if not allowed) */}
              <button className={`w-full py-2.5 md:py-3 px-4 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 
                    bg-[#1F1F1F] text-white                 
                    ${!item.allowed_on_road || item.not_suitable_for_heavy_waste ? 'opacity-100 pointer-events-none' : 'group-hover:bg-[#0037C1] group-hover:text-white hover:shadow-md'}`}
              >
                {(!item.allowed_on_road || item.not_suitable_for_heavy_waste)
                  ? <span>Unavailable</span>
                  : (
                    <>
                      <span>Select This Skip</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </>
                  )
                }
              </button>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* "Show more" button to reveal more skip cards */}
      {visibleCount < filteredItems.length && (
        <div className="text-center mt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-4 py-2 bg-[#0037C1] text-white rounded hover:bg-[#0051ff] transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>

  );
}

export default SelectSkip;