import type { LoyaltyLevel } from '../../types';
import { LOYALTY_ICONS, IconBox, Lock } from '../../icons';

const LEVEL_STYLES: Record<LoyaltyLevel, { bg: string; color: string }> = {
  Caramel: { bg: 'rgba(212,160,23,0.15)', color: '#D4A017' },
  Sucre: { bg: 'rgba(255,107,157,0.15)', color: '#FF6B9D' },
  Chocolat: { bg: 'rgba(107,58,42,0.15)', color: '#6B3A2A' },
  VIP: { bg: 'rgba(168,85,247,0.15)', color: '#A855F7' },
};

interface LoyaltyBadgeProps {
  level: LoyaltyLevel;
  locked?: boolean;
  size?: 'sm' | 'md';
}

export default function LoyaltyBadge({ level, locked, size = 'md' }: LoyaltyBadgeProps) {
  const s = LEVEL_STYLES[level];
  const Icon = LOYALTY_ICONS[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-4 py-2 text-sm'
      } ${locked ? 'opacity-40 grayscale' : ''}`}
      style={{
        background: s.bg,
        color: s.color,
        fontFamily: 'Poppins, sans-serif',
        border: `1.5px solid ${s.color}33`,
      }}
    >
      <IconBox icon={Icon} size={size === 'sm' ? 14 : 16} color={s.color} />
      {level}
      {locked && <Lock size={12} />}
    </span>
  );
}
