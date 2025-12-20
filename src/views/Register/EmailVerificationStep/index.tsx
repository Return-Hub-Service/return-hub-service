'use client';

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Button from '@/src/components/Button';
import VerificationInput from '@/src/components/VerificationInput';
import { RegisterStep2Data } from '@/src/interfaces/Register';
import styles from './EmailVerificationStep.module.css';

interface EmailVerificationStepProps {
  email: string;
  onNext: (data: RegisterStep2Data) => void;
  onBack: () => void;
}

export default function EmailVerificationStep({
  email,
  onNext,
  onBack,
}: EmailVerificationStepProps) {
  const handleVerificationComplete = (code: string) => {
    console.log('Verification code entered:', code);
  };

  const handleVerify = () => {
    // In real app, would validate the code here
    const data: RegisterStep2Data = {
      verificationCode: '123456', // Mock data
    };
    console.log('Step 2 - Email Verification:', data);
    onNext(data);
  };

  const handleResend = () => {
    console.log('Resending verification code to:', email);
  };

  return (
    <div>
      <div className={styles.authHeader}>
        <h1 className={styles.authTitle}>Verify your email</h1>
        <p className={styles.authSubtitle}>
          We sent a 6-digit code to <strong>{email}</strong>
        </p>
      </div>

      <VerificationInput onComplete={handleVerificationComplete} />

      <p className={styles.resendText}>
        Didn't receive a code?{' '}
        <button onClick={handleResend} className={styles.authLink}>
          Resend
        </button>
      </p>

      <div className={styles.buttonGroup}>
        <Button
          variant="outline"
          size="lg"
          leftIcon={<IconArrowLeft size={20} />}
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          rightIcon={<IconArrowRight size={20} />}
          onClick={handleVerify}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
