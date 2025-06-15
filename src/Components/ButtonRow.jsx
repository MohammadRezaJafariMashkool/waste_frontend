import { 
  MapPin, 
  Trash2, 
  Truck, 
  Shield, 
  Calendar, 
  CreditCard 
} from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Main component that renders a row of step buttons
 */
const ButtonRow = () => {
  const steps = [
    { icon: MapPin, label: 'Postcode' },
    { icon: Trash2, label: 'Waste Type' },
    { icon: Truck, label: 'Select Skip' },
    { icon: Shield, label: 'Permit Check' },
    { icon: Calendar, label: 'Choose Date' },
    { icon: CreditCard, label: 'Payment' },
  ];

  // Simulated current step index (can be dynamic)
  const currentStepIndex = 2;

  // Track mobile view
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex justify-center mb-8 overflow-x-auto space-x-2 md:space-x-4">
      {steps.map((step, index) => (
        <StepButton
          key={index}
          icon={step.icon}
          label={step.label}
          isMobile={isMobile}
          stepIndex={index}
          currentStepIndex={currentStepIndex}
          showLine={index !== steps.length - 1}
        />
      ))}
    </div>
  );
};

/**
 * Individual step button with dynamic behavior based on current step and screen size
 */
const StepButton = ({ 
  icon: Icon, 
  label, 
  isMobile,
  stepIndex,
  currentStepIndex,
  showLine
}) => {
  const isCurrent = stepIndex === currentStepIndex;
  const isBefore = stepIndex < currentStepIndex;
  const isAfter = stepIndex > currentStepIndex;

  // Icon color logic
  const iconColor = isMobile
  ? (isBefore || isCurrent ? '#0037C1' : '#6B7280') // Mobile: current and past steps are blue
  : (isAfter ? '#6B7280' : (isCurrent ? '#0037C1' : '#0037C1')); // Desktop: blue current, dark gray past, gray future


  // Text color logic
  const textColor = isAfter ? '#6B7280' : '#FFFFFF';

  return (
    <div className="flex items-center space-x-1 md:space-x-4">
      <button 
        disabled={isAfter}
        className={`flex items-center transition-colors whitespace-nowrap ${
          isCurrent ? 'text-[#0037C1]' : 'hover:text-[#0037C1] text-[#2A2A2A]'
        }`}
      >
        {/* Icon */}
        <Icon 
          className="w-6 h-6" 
          color={iconColor}
          strokeWidth={2}
        />

        {/* Label: only show on desktop or current step on mobile */}
        {(!isMobile || isCurrent) && (
          <span className="ml-2" style={{ color: textColor }}>
            {label}
          </span>
        )}
      </button>

      {/* Connector line */}
      {showLine && (
        <div 
          className={`bg-current ${isMobile ? 'w-3 h-[1px]' : 'w-16 h-[1px]'}`}
          style={{ backgroundColor: iconColor }}
        />
      )}
    </div>
  );
};

export default ButtonRow;
