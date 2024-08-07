import dayjs from 'dayjs';


export const dateFormat = (date: string): string => {
  return dayjs(date).format('LL');
};