import data from '../Assets/data.json';
import { ArrowRight, AlertTriangle } from 'lucide-react';

const SelectSkip = () => {
  const calculatePrice = (item) => Math.round(item.price_before_vat * (1 + item.vat/100));

  const getImageUrl = (size) => 
    `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;

  return (
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <h2 className="text-2xl font-bold text-center mb-4">Choose Your Skip Size</h2>
        <p className='text-gray-400 text-center mb-8'>Select the skip size that best suits your needs</p>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {/* Grid layout: responsive columns for 1, 2, or 3 cards per row depending on screen size */}

          {data.map((item) => (
            <div 
              key={item.id}
              className={`group relative rounded-lg border-2 p-4 md:p-6 transition duration-300 ease-in-out
                border-[#2A2A2A] hover:border-[#0037C1]/50 hover:shadow-lg hover:scale-[1.01]
                bg-[#1C1C1C] text-white
                ${item.recommended ? 'border-yellow-400' : ''}
                `}> 
              
              {/* 
                🔧 Added:
                - Highlight border in yellow if item is marked as recommended
              */}

              {/* Each card:
                  - Rounded border with hover color effect
                  - Subtle zoom and shadow on hover
                  - Dimmed and disabled (non-clickable) if conditions are not met
              */}

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-md mb-4">
                  {/* ✅ Change:
                      - Enforced 4:3 aspect ratio for layout consistency
                  */}
                  <img 
                    src={getImageUrl(item.size)} 
                    alt={`${item.size} Yard Skip`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {item.recommended && (
                    <div className="absolute top-3 left-2 z-20 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {/* ⭐ Added:
                          - "Recommended" badge for highlighted skip
                      */}
                      ⭐ Recommended
                    </div>
                  )}
                </div>

                <div className="absolute top-3 right-2 z-20 bg-[#0037C1] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                  {/* Size badge (e.g., "4 Yards") positioned top-right over the image */}
                  {item.size} Yards
                </div>

                <div className="absolute bottom-3 left-2 z-20 space-y-2">
                  {/* 🚫 Updated:
                      - Added tooltip (title) with explanation
                      - Changed cursor to `help` to suggest extra info
                  */}
                  {!item.allowed_on_road && (
                    <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2"
                      title="This skip cannot be placed on public roads due to local council restrictions."
                      style={{ cursor: 'help' }}
                    >
                      <AlertTriangle className="text-xs text-yellow-500 w-4 h-4" />
                      <span className="text-xs text-yellow-500">
                        Not Allowed on the Road
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                {/* Card title */}
                {item.size} Yard Skip
              </h3>

              <div className="flex justify-between items-center mb-4">
                <div>
                  {/* Price displayed prominently */}
                  <span className="text-xl md:text-2xl font-bold text-[#0037C1]">
                    £{calculatePrice(item)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-4 md:mb-6">
                {/* Hire period information */}
                {item.hire_period_days} day hire period
              </p>

              <button className={`w-full py-2.5 md:py-3 px-4 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 
                bg-[#2A2A2A] text-white                 
                ${!item.allowed_on_road || item.not_suitable_for_heavy_waste ? 'opacity-100 pointer-events-none' : 'group-hover:bg-[#0037C1] group-hover:text-white hover:shadow-md'}`}
              >
                {/* 🎨 Enhancement:
                    - Group hover added for color change
                    - Keeps button interactive only when skip is allowed
                */}
                <span>Select This Skip</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>

          ))}
        </div>

      </div>
  );
}

export default SelectSkip;