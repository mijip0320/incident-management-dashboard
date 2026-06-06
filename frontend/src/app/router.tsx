import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouteBoundary } from '@/app/RouteBoundary';
import { ROUTES } from '@/shared/constants/routes';
import { lazyPage } from '@/shared/lib/lazy-page';

const DashboardPage = lazyPage(
  () => import('@/pages/dashboard/DashboardPage'),
  'DashboardPage',
);
const IncidentsPage = lazyPage(
  () => import('@/pages/incidents/IncidentsPage'),
  'IncidentsPage',
);
const LoginPage = lazyPage(
  () => import('@/pages/login/LoginPage'),
  'LoginPage',
);
const PostmortemsPage = lazyPage(
  () => import('@/pages/postmortems/PostmortemsPage'),
  'PostmortemsPage',
);
const ServicesPage = lazyPage(
  () => import('@/pages/services/ServicesPage'),
  'ServicesPage',
);
const SettingsPage = lazyPage(
  () => import('@/pages/settings/SettingsPage'),
  'SettingsPage',
);

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <Navigate to={ROUTES.dashboard} replace />,
  },
  {
    path: ROUTES.login,
    element: (
      <RouteBoundary>
        <LoginPage />
      </RouteBoundary>
    ),
  },
  {
    path: ROUTES.dashboard,
    element: (
      <RouteBoundary>
        <DashboardPage />
      </RouteBoundary>
    ),
  },
  {
    path: ROUTES.incidents,
    element: (
      <RouteBoundary>
        <IncidentsPage />
      </RouteBoundary>
    ),
  },
  {
    path: ROUTES.services,
    element: (
      <RouteBoundary>
        <ServicesPage />
      </RouteBoundary>
    ),
  },
  {
    path: ROUTES.postmortems,
    element: (
      <RouteBoundary>
        <PostmortemsPage />
      </RouteBoundary>
    ),
  },
  {
    path: ROUTES.settings,
    element: (
      <RouteBoundary>
        <SettingsPage />
      </RouteBoundary>
    ),
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.dashboard} replace />,
  },
]);
