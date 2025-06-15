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
          {data.map((item) => (
            <div 
              key={item.id}
              className="group relative rounded-lg border-2 p-4 md:p-6 transition-all
        border-[#2A2A2A] hover:border-[#0037C1]/50
        bg-[#1C1C1C] text-white cursor-pointer"
            >
              <div className="relative">
                  <img 
                    src={getImageUrl(item.size)} 
                    alt={`${item.size} Yard Skip`} 
                    className="w-full h-36 md:h-48 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-2 z-20 bg-[#0037C1] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    {item.size} Yards
                  </div>
                  <div className="absolute bottom-3 left-2 z-20 space-y-2">
                    {!item.allowed_on_road && (
                      <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                        <AlertTriangle className="text-xs font-medium text-yellow-500 w-[16px] h-[16px] sm:w-[16px] sm:h-[16px]" strokeWidth={2}/>
                        <span className="text-xs font-medium text-yellow-500">
                          Not Allowed On the Road
                        </span>
                      </div>
                    )}
                  </div>
              </div>

                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                  {item.size} Yard Skip
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-[#0037C1]">
                      £{calculatePrice(item)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4 md:mb-6">
                  {item.hire_period_days} day hire period
                </p>

              <button className="w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center space-x-2 bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] hover:border-[#0037C1] false">
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