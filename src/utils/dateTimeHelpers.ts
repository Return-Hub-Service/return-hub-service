import { format, addDays } from 'date-fns';

export interface DateOption {
  date: Date;
  dayName: string;
  dateLabel: string;
  available: boolean;
}

export function getNextSevenDays(): DateOption[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i);
    return {
      date,
      dayName: format(date, 'EEE'),
      dateLabel: format(date, 'MMM d'),
      available: true,
    };
  });
}

export function formatTimeSlot(hour: number): string {
  const start = format(new Date().setHours(hour, 0), 'h:mm a');
  const end = format(new Date().setHours(hour + 2, 0), 'h:mm a');
  return `${start} - ${end}`;
}

export const TIME_SLOTS = [
  { hour: 8, label: '8AM - 10AM' },
  { hour: 10, label: '10AM - 12PM' },
  { hour: 12, label: '12PM - 2PM' },
  { hour: 14, label: '2PM - 4PM' },
  { hour: 16, label: '4PM - 6PM' },
  { hour: 18, label: '6PM - 8PM' },
];
