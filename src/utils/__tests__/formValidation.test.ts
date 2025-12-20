import { validateEmail, validatePassword, validatePhone, validateRequired } from '../formValidation';

describe('formValidation', () => {
  describe('validateEmail', () => {
    it('should return null for valid email', () => {
      expect(validateEmail('test@example.com')).toBeNull();
    });

    it('should return error for empty email', () => {
      expect(validateEmail('')).toBe('Email is required');
    });

    it('should return error for invalid email format', () => {
      expect(validateEmail('invalid-email')).toBe('Invalid email format');
      expect(validateEmail('test@')).toBe('Invalid email format');
      expect(validateEmail('@example.com')).toBe('Invalid email format');
    });
  });

  describe('validatePassword', () => {
    it('should return null for valid password', () => {
      expect(validatePassword('password123')).toBeNull();
    });

    it('should return error for empty password', () => {
      expect(validatePassword('')).toBe('Password is required');
    });

    it('should return error for short password', () => {
      expect(validatePassword('pass')).toBe('Password must be at least 8 characters');
    });
  });

  describe('validatePhone', () => {
    it('should return null for valid 10-digit phone', () => {
      expect(validatePhone('1234567890')).toBeNull();
      expect(validatePhone('(123) 456-7890')).toBeNull();
    });

    it('should return error for empty phone', () => {
      expect(validatePhone('')).toBe('Phone number is required');
    });

    it('should return error for invalid length', () => {
      expect(validatePhone('123')).toBe('Phone must be 10 digits');
      expect(validatePhone('12345678901')).toBe('Phone must be 10 digits');
    });
  });

  describe('validateRequired', () => {
    it('should return null for valid value', () => {
      expect(validateRequired('value', 'Field')).toBeNull();
    });

    it('should return error for empty value', () => {
      expect(validateRequired('', 'Field')).toBe('Field is required');
      expect(validateRequired('   ', 'Field')).toBe('Field is required');
    });
  });
});
