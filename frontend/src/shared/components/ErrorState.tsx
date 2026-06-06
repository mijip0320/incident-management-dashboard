interface ErrorStateProps {
  message?: string;
}

export const ErrorState = ({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
}: ErrorStateProps) => {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 p-8">
      <p className="text-sm text-destructive">{message}</p>
    </div>
  );
};
