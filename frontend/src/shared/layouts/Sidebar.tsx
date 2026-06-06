import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useLayoutStore } from '@/shared/model/useLayoutStore';
import { NAV_ITEMS } from '@/shared/constants/routes';
import { NavIcon } from '@/shared/layouts/NavIcon';

export const Sidebar = () => {
  const isMobileSidebarOpen = useLayoutStore((s) => s.isMobileSidebarOpen);
  const closeMobileSidebar = useLayoutStore((s) => s.closeMobileSidebar);

  return (
    <>
      {isMobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-background/80 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 flex w-sidebar flex-col border-r border-border bg-card transition-transform duration-200 lg:static lg:translate-x-0',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              IM
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Incident Mgmt
              </p>
              <p className="text-xs text-muted-foreground">Operations</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )
              }
            >
              <NavIcon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">Demo Environment</p>
          <p className="mt-1 text-xs font-medium text-foreground">v0.1.0</p>
        </div>
      </aside>
    </>
  );
};
