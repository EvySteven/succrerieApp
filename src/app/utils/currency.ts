/** Montants en franc CFA (XOF) — pas de centimes */
export const FREE_SHIPPING_MIN = 20_000;
export const GIFT_ORDER_MIN = 33_000;
export const SHIPPING_FEE = 3_200;
export const POINTS_DISCOUNT = 1_650;

export function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount))} FCFA`;
}
