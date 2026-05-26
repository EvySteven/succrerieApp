import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export default function StarRating({
  rating,
  max = 5,
  size = 14,
  showValue,
  reviewCount,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.floor(rating)
              ? 'fill-[#FFD93D] text-[#FFD93D]'
              : i < rating
                ? 'fill-[#FFD93D]/50 text-[#FFD93D]'
                : 'fill-gray-200 text-gray-200'
          }
        />
      ))}
      {showValue && (
        <span className="text-sm text-[#8B6355] ml-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-[#8B6355] ml-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
