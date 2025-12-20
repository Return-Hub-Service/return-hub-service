'use client';

import { useState } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import Button from '@/src/components/Button';
import { validateEmail } from '@/src/utils/formValidation';
import { ResetPasswordStep1Data } from '@/src/interfaces/ResetPassword';
import styles from './EmailInputStep.module.css';
import Link from 'next/link';

interface EmailInputStepProps {
  onNext: (data: ResetPasswordStep1Data) => void;
}

export default function EmailInputStep({ onNext }: EmailInputStepProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    console.log('Step 1 - Email Input:', { email });
    onNext({ email });
  };

  return (
    <div>
      <div className={styles.authHeader}>
        <h1 className={styles.authTitle}>Reset password</h1>
        <p className={styles.authSubtitle}>
          Enter your email and we'll send you a reset code
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email address</label>
          <input
            type="email"
            className={`${styles.formInput} ${error ? styles.error : ''}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          rightIcon={<IconArrowRight size={20} />}
        >
          Send reset code
        </Button>
      </form>

      <p className={styles.authFooter}>
        Remember your password?{' '}
        <Link href="/login" className={styles.authLink}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
