export interface NavItem {
  label: string;
  href: string;
}

export const navbarConfig = {
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work-experience' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resume', href: '/resume' },
  ] as NavItem[],
};
