export const ROUTES = {
  root: '/',
  login: '/login',
  dashboard: '/dashboard',
  incidents: '/incidents',
  services: '/services',
  postmortems: '/postmortems',
  settings: '/settings',
} as const;

export const NAV_ITEMS = [
  { to: ROUTES.dashboard, label: 'Dashboard' },
  { to: ROUTES.incidents, label: 'Incidents' },
  { to: ROUTES.services, label: 'Services' },
  { to: ROUTES.postmortems, label: 'Postmortems' },
  { to: ROUTES.settings, label: 'Settings' },
] as const;
