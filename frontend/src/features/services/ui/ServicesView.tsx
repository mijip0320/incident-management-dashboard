import { useState } from 'react';
import { useServicesQuery } from '@/entities/service/api/useServicesQuery';
import type { Service } from '@/entities/service/model/types';
import { ServiceDetailDrawer } from '@/features/services/ui/ServiceDetailDrawer';
import { ServicesTable } from '@/features/services/ui/ServicesTable';
import { DashboardSkeleton } from '@/shared/components/DashboardSkeleton';
import { ErrorState } from '@/shared/components/ErrorState';

export const ServicesView = () => {
  const { data: services, isLoading, isError } = useServicesQuery();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !services) return <ErrorState />;

  return (
    <>
      <ServicesTable
        services={services}
        onViewDetail={setSelectedService}
      />
      <ServiceDetailDrawer
        service={selectedService}
        open={selectedService !== null}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
};
