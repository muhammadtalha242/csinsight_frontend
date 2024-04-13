import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  // { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie', disabled: true },
  { key: 'papers', title: 'Papers', href: paths.dashboard.papers, icon: 'description' },
  { key: 'authors', title: 'Authors', href: paths.dashboard.authors, icon: 'users' },
  { key: 'venues', title: 'Venues', href: paths.dashboard.venues, icon: 'MapPin' },
  // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
