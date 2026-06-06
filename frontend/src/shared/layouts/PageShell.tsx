import clsx from 'clsx';
import type { ReactNode } from 'react';

interface PageShellProps {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

export const PageShell = ({
  title,
  description,
  children,
  className,
}: PageShellProps) => {
  return (
    <main
      className={clsx(
        'mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-16',
        className,
      )}
    >
      <header className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Incident Management Dashboard
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          {description}
        </p>
      </header>
      {children}
    </main>
  );
};
