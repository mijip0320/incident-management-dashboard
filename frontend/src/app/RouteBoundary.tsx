import { Suspense, type ReactNode } from 'react';
import { PageLoader } from '@/shared/components/PageLoader';

interface RouteBoundaryProps {
  children: ReactNode;
}

export const RouteBoundary = ({ children }: RouteBoundaryProps) => {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};
