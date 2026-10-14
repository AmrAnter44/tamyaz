import { Coffee, UtensilsCrossed, Scissors, Stethoscope, Smile, Pill, Dumbbell, ShoppingBag } from "lucide-react";

const ICONS = { Coffee, UtensilsCrossed, Scissors, Stethoscope, Smile, Pill, Dumbbell, ShoppingBag };

export default function SystemIcon({ name, size = 22 }) {
  const Icon = ICONS[name] ?? Coffee;
  return (
    <span className="t-icon">
      <Icon size={size} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}
