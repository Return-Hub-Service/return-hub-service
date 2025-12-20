'use client';

import { useState } from 'react';
import { IconArrowRight, IconEye, IconEyeOff } from '@tabler/icons-react';
import Button from '@/src/components/Button';
import SocialLoginButton from '@/src/views/Login/SocialLoginButton';
import { validateEmail, validatePassword } from '@/src/utils/formValidation';
import { RegisterStep1Data } from '@/src/interfaces/Register';
import styles from './AccountCreationStep.module.css';
import Link from 'next/link';

interface AccountCreationStepProps {
  onNext: (data: RegisterStep1Data) => void;
}

export default function AccountCreationStep({
  onNext,
}: AccountCreationStepProps) {
  const [formData, setFormData] = useState<RegisterStep1Data>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterStep1Data>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    console.log('Step 1 - Account Creation:', formData);
    onNext(formData);
  };

  return (
    <div>
      <div className={styles.authHeader}>
        <h1 className={styles.authTitle}>Create your account</h1>
        <p className={styles.authSubtitle}>
          Start scheduling return pickups in minutes
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Email address <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({ ...errors, email: undefined });
            }}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Password <span className={styles.required}>*</span>
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setErrors({ ...errors, password: undefined });
              }}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>
          <p className={styles.formHint}>Must be at least 8 characters</p>
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          rightIcon={<IconArrowRight size={20} />}
        >
          Continue
        </Button>
      </form>

      <div className={styles.divider}>or continue with</div>

      <SocialLoginButton />

      <p className={styles.authFooter}>
        Already have an account?{' '}
        <Link href="/login" className={styles.authLink}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
