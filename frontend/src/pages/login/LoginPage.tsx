import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            IM
          </span>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Login</h1>
            <p className="text-xs text-muted-foreground">
              Incident Management Dashboard
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          데모 로그인 화면은 추후 구현 예정입니다.
        </p>

        <Link
          to={ROUTES.dashboard}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-accent"
        >
          Dashboard로 이동 (Demo)
        </Link>
      </div>
    </div>
  );
};
