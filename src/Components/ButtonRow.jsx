import { 
  MapPin, 
  Trash2, 
  Truck, 
  Shield, 
  Calendar, 
  CreditCard 
} from 'lucide-react';

const StepButton = ({ 
  icon: Icon, 
  label, 
  isActive = false, 
  isDisabled = false,
  showLine = true 
}) => {
  // Colors based on state
  const iconColor = isDisabled ? '#6B7280' : (isActive ? '#0037C1' : '#2a2a2a');
  const textColor = isDisabled ? '#6B7280' : '#FFFFFF';
  const lineColor = isDisabled ? '#6B7280' : (isActive ? '#0037C1' : '#2a2a2a');
  
  return (
      <div className="flex items-center space-x-4">
        <button className='flex items-center whitespace-nowrap transition-colors text-[#0037C1] cursor-pointer hover:text-[#0037C1]'>
          {/* Icon */}
            <Icon 
              className="w-6 h-6" 
              color={iconColor} 
              strokeWidth={2}
            />        
          {/* Label */}
            <span style={{ color: textColor }} className="ml-2 text-white">
              {label}
            </span>
        </button>        
        {/* Line (except for last item) */}
        {showLine && (
          <div className="w-16 h-px bg-[#0037C1]" style={{ backgroundColor: lineColor }}></div>
        )}
      </div>
  );
};

const ButtonRow = () => {
  const steps = [
    { icon: MapPin, label: 'Postcode', isActive: true },
    { icon: Trash2, label: 'Waste Type', isActive: true },
    { icon: Truck, label: 'Select Skip', isActive: true },
    { icon: Shield, label: 'Permit Check', isDisabled: true },
    { icon: Calendar, label: 'Choose Date', isDisabled: true },
    { icon: CreditCard, label: 'Payment', isDisabled: true },
  ];

  return (
    <div className="flex justify-center mb-8 overflow-x-auto space-x-4">
        {steps.map((step, index) => (
            <StepButton
              key={index}
              icon={step.icon}
              label={step.label}
              isActive={step.isActive}
              isDisabled={step.isDisabled}
              showLine={index !== steps.length - 1}
            />
        ))}
    </div>
  );
};

export default ButtonRow;