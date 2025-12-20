import { getNextSevenDays, formatTimeSlot, TIME_SLOTS } from '../dateTimeHelpers';

describe('dateTimeHelpers', () => {
  describe('getNextSevenDays', () => {
    it('should return 7 date options', () => {
      const dates = getNextSevenDays();
      expect(dates).toHaveLength(7);
    });

    it('should have correct properties', () => {
      const dates = getNextSevenDays();
      dates.forEach(dateOption => {
        expect(dateOption).toHaveProperty('date');
        expect(dateOption).toHaveProperty('dayName');
        expect(dateOption).toHaveProperty('dateLabel');
        expect(dateOption).toHaveProperty('available');
        expect(typeof dateOption.dayName).toBe('string');
        expect(typeof dateOption.dateLabel).toBe('string');
        expect(dateOption.available).toBe(true);
      });
    });

    it('should start with today', () => {
      const dates = getNextSevenDays();
      const today = new Date();
      expect(dates[0].date.getDate()).toBe(today.getDate());
    });
  });

  describe('formatTimeSlot', () => {
    it('should format time slot correctly', () => {
      const slot = formatTimeSlot(8);
      expect(slot).toMatch(/8:00.*10:00/);
    });

    it('should handle different hours', () => {
      expect(formatTimeSlot(14)).toMatch(/2:00.*4:00/);
    });
  });

  describe('TIME_SLOTS', () => {
    it('should have 6 time slots', () => {
      expect(TIME_SLOTS).toHaveLength(6);
    });

    it('should have hour and label properties', () => {
      TIME_SLOTS.forEach(slot => {
        expect(slot).toHaveProperty('hour');
        expect(slot).toHaveProperty('label');
        expect(typeof slot.hour).toBe('number');
        expect(typeof slot.label).toBe('string');
      });
    });
  });
});
