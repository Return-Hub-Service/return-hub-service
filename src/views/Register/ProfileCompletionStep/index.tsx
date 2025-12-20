'use client';

import { useState } from 'react';
import { IconArrowLeft, IconCheck } from '@tabler/icons-react';
import Button from '@/src/components/Button';
import { validateRequired, validatePhone } from '@/src/utils/formValidation';
import { RegisterStep3Data } from '@/src/interfaces/Register';
import styles from './ProfileCompletionStep.module.css';

interface ProfileCompletionStepProps {
  onComplete: (data: RegisterStep3Data) => void;
  onBack: () => void;
}

export default function ProfileCompletionStep({
  onComplete,
  onBack,
}: ProfileCompletionStepProps) {
  const [formData, setFormData] = useState<RegisterStep3Data>({
    fullName: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterStep3Data>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateRequired(formData.fullName, 'Full name');
    const phoneError = validatePhone(formData.phoneNumber);

    if (nameError || phoneError) {
      setErrors({
        fullName: nameError || undefined,
        phoneNumber: phoneError || undefined,
      });
      return;
    }

    console.log('Step 3 - Profile Completion:', formData);
    onComplete(formData);
  };

  return (
    <div>
      <div className={styles.authHeader}>
        <h1 className={styles.authTitle}>Complete your profile</h1>
        <p className={styles.authSubtitle}>
          Just a few more details to get started
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Full name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={`${styles.formInput} ${errors.fullName ? styles.error : ''}`}
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              setErrors({ ...errors, fullName: undefined });
            }}
          />
          {errors.fullName && (
            <p className={styles.errorMessage}>{errors.fullName}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Phone number <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            className={`${styles.formInput} ${errors.phoneNumber ? styles.error : ''}`}
            placeholder="(555) 123-4567"
            value={formData.phoneNumber}
            onChange={(e) => {
              setFormData({ ...formData, phoneNumber: e.target.value });
              setErrors({ ...errors, phoneNumber: undefined });
            }}
          />
          {errors.phoneNumber && (
            <p className={styles.errorMessage}>{errors.phoneNumber}</p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<IconArrowLeft size={20} />}
            onClick={onBack}
            type="button"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={<IconCheck size={20} strokeWidth={3} />}
          >
            Complete
          </Button>
        </div>
      </form>
    </div>
  );
}
