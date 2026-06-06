import { DashboardView } from '@/features/dashboard/ui/DashboardView';
import { PageContainer } from '@/shared/layouts/PageContainer';

export const DashboardPage = () => {
  return (
    <PageContainer
      title="Dashboard"
      description="서비스 운영 상태와 장애 현황을 한눈에 보여주는 메인 대시보드입니다."
    >
      <DashboardView />
    </PageContainer>
  );
};
