import { mockServices } from '@/entities/service/model/mock-services';
import type { Service } from '@/entities/service/model/types';
import { mockDelay } from '@/shared/lib/mock-delay';

export const fetchServices = async (): Promise<Service[]> => {
  await mockDelay();
  return mockServices;
};

export const fetchServiceById = async (id: string): Promise<Service | undefined> => {
  await mockDelay();
  return mockServices.find((service) => service.id === id);
};
