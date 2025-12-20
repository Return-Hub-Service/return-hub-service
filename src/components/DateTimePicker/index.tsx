'use client';

import { format } from 'date-fns';
import { getNextSevenDays, TIME_SLOTS } from '@/src/utils/dateTimeHelpers';
import styles from './DateTimePicker.module.css';

interface DateTimePickerProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const dateOptions = getNextSevenDays();

  return (
    <div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Preferred Date <span className={styles.required}>*</span>
        </label>
        <div className={styles.datePicker}>
          {dateOptions.map((option, index) => {
            const dateValue = format(option.date, 'yyyy-MM-dd');
            return (
              <div
                key={dateValue}
                className={`${styles.dateOption} ${
                  index === 0 && !option.available ? styles.unavailable : ''
                } ${selectedDate === dateValue ? styles.selected : ''}`}
                onClick={() => option.available && onDateChange(dateValue)}
              >
                <div className={styles.dateDay}>{option.dayName}</div>
                <div className={styles.dateDate}>{option.dateLabel}</div>
                {index === 0 && !option.available && (
                  <div className={styles.unavailableText}>Full</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Time Window <span className={styles.required}>*</span>
        </label>
        <div className={styles.timeSlots}>
          {TIME_SLOTS.map((slot) => (
            <div
              key={slot.label}
              className={`${styles.timeSlot} ${
                selectedTime === slot.label ? styles.selected : ''
              }`}
              onClick={() => onTimeChange(slot.label)}
            >
              {slot.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
