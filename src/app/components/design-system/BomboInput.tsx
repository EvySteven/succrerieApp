import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

interface BomboInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const BomboInput = forwardRef<HTMLInputElement, BomboInputProps>(
  ({ error, label, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            className="text-sm font-semibold text-[#3D1C02] block mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-2xl text-sm outline-none transition-all',
            'bg-[#FFF8F0] text-[#3D1C02]',
            error
              ? 'border-2 border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border-[1.5px] border-[rgba(255,107,157,0.2)] focus:border-[#FF6B9D] focus:ring-2 focus:ring-pink-100',
            className
          )}
          style={{ fontFamily: 'Poppins, sans-serif' }}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

BomboInput.displayName = 'BomboInput';

export default BomboInput;
