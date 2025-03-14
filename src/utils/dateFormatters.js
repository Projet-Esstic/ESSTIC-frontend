
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatExamDate = (date) => {
  if (!date) return '';
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  return format(parsedDate, "d MMMM yyyy 'à' HH'h'mm", {
    locale: fr
  });
};

export const formatExamDateShort = (date) => {
  if (!date) return '';
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  return format(parsedDate, 'dd/MM/yyyy HH:mm', {
    locale: fr
  });
};

export const formatExamWeekDay = (date) => {
  if (!date) return '';
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  return format(parsedDate, 'EEEE', {
    locale: fr
  });
};
