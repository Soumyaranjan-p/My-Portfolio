export interface RadialMenuItemConfig {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface RadialMenuProps {
  items: RadialMenuItemConfig[];
  /** Distance from center to item buttons in px */
  radius?: number;
  /** Starting angle in degrees (0 = right, 90 = top) */
  startAngle?: number;
  /** Spread arc in degrees */
  spreadAngle?: number;
  className?: string;
}