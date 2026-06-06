import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatLastChecked = (iso: string) => {
  const date = new Date(iso);
  return {
    relative: formatDistanceToNow(date, { addSuffix: true, locale: ko }),
    absolute: format(date, 'yyyy-MM-dd HH:mm:ss', { locale: ko }),
  };
};
