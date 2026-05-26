import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../ui/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger';

interface BomboButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'text-white shadow-md hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'bg-[#FFD93D] text-[#3D1C02] hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98]',
  outline:
    'bg-transparent border-2 border-[#FF6B9D] text-[#FF6B9D] hover:bg-pink-50',
  danger:
    'bg-red-500 text-white hover:bg-red-600',
};

export default function BomboButton({
  variant = 'primary',
  children,
  fullWidth,
  className,
  style,
  ...props
}: BomboButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant],
        fullWidth && 'w-full',
        className
      )}
      style={{
        fontFamily: 'Baloo 2, cursive',
        ...(variant === 'primary'
          ? { background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }
          : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
