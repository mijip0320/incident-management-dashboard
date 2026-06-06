import clsx from 'clsx';
import type { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export const PageContainer = ({
  title,
  description,
  children,
  className,
  actions,
}: PageContainerProps) => {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8',
        className,
      )}
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
      {children}
    </div>
  );
};
