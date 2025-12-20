'use client';

import { useState } from 'react';
import { IconCheck, IconEye, IconEyeOff } from '@tabler/icons-react';
import Button from '@/src/components/Button';
import { validatePassword } from '@/src/utils/formValidation';
import { ResetPasswordStep3Data } from '@/src/interfaces/ResetPassword';
import styles from './NewPasswordStep.module.css';

interface NewPasswordStepProps {
  onComplete: (data: ResetPasswordStep3Data) => void;
}

export default function NewPasswordStep({ onComplete }: NewPasswordStepProps) {
  const [formData, setFormData] = useState<ResetPasswordStep3Data>({
    newPassword: '',
    confirmPassword: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<ResetPasswordStep3Data>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPasswordError = validatePassword(formData.newPassword);
    let confirmPasswordError = null;

    if (!formData.confirmPassword) {
      confirmPasswordError = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      confirmPasswordError = 'Passwords do not match';
    }

    if (newPasswordError || confirmPasswordError) {
      setErrors({
        newPassword: newPasswordError || undefined,
        confirmPassword: confirmPasswordError || undefined,
      });
      return;
    }

    console.log('Step 3 - New Password:', formData);
    onComplete(formData);
  };

  return (
    <div>
      <div className={styles.authHeader}>
        <h1 className={styles.authTitle}>New password</h1>
        <p className={styles.authSubtitle}>
          Create a new password for your account
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>New password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              className={`${styles.formInput} ${errors.newPassword ? styles.error : ''}`}
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={(e) => {
                setFormData({ ...formData, newPassword: e.target.value });
                setErrors({ ...errors, newPassword: undefined });
              }}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>
          <p className={styles.formHint}>Must be at least 8 characters</p>
          {errors.newPassword && (
            <p className={styles.errorMessage}>{errors.newPassword}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Confirm password</label>
          <input
            type="password"
            className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              setErrors({ ...errors, confirmPassword: undefined });
            }}
          />
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          rightIcon={<IconCheck size={20} strokeWidth={3} />}
        >
          Reset password
        </Button>
      </form>
    </div>
  );
}
