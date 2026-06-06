import type { NavIconName } from '@/shared/layouts/NavIcon';

export const ROUTES = {
  root: '/',
  login: '/login',
  dashboard: '/dashboard',
  incidents: '/incidents',
  services: '/services',
  postmortems: '/postmortems',
  settings: '/settings',
} as const;

export const NAV_ITEMS: ReadonlyArray<{
  to: (typeof ROUTES)[keyof typeof ROUTES];
  label: string;
  icon: NavIconName;
}> = [
  { to: ROUTES.dashboard, label: 'Dashboard', icon: 'dashboard' },
  { to: ROUTES.incidents, label: 'Incidents', icon: 'incidents' },
  { to: ROUTES.services, label: 'Services', icon: 'services' },
  { to: ROUTES.postmortems, label: 'Postmortems', icon: 'postmortems' },
  { to: ROUTES.settings, label: 'Settings', icon: 'settings' },
];
