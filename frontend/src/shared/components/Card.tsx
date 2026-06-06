import type { ReactNode } from 'react';
import {
  Card as ShadcnCard,
  CardDescription,
  CardHeader as ShadcnCardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export {
  CardContent,
  CardDescription,
  CardTitle,
} from '@/shared/components/ui/card';

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <ShadcnCard className={className}>{children}</ShadcnCard>;
};

interface CardHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

/** shadcn CardHeader + CardTitle/CardDescription 편의 wrapper */
export const CardHeader = ({
  title,
  description,
  className,
}: CardHeaderProps) => {
  return (
    <ShadcnCardHeader className={className}>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </ShadcnCardHeader>
  );
};
