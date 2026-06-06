import { useLayoutStore } from '@/shared/model/useLayoutStore';

export const Header = () => {
  const toggleMobileSidebar = useLayoutStore((s) => s.toggleMobileSidebar);

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition hover:bg-secondary lg:hidden"
          onClick={toggleMobileSidebar}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-foreground">
            Incident Management Dashboard
          </p>
          <p className="text-xs text-muted-foreground">
            Real-time operations monitoring
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground sm:inline-flex">
          <span className="h-2 w-2 rounded-full bg-status-operational" />
          All Systems
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
          OP
        </div>
      </div>
    </header>
  );
};
