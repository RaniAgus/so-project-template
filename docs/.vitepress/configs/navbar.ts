export type NavItem =
  { text: string; link: string; } |
  { text: string; items: NavItem[]; };

export const navbar = [];
