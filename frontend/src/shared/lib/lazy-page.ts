import { lazy, type ComponentType } from 'react';

export const lazyPage = (
  factory: () => Promise<Record<string, ComponentType>>,
  exportName: string,
) =>
  lazy(() =>
    factory().then((module) => ({
      default: module[exportName],
    })),
  );
