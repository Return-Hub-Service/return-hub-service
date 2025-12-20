'use client';

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Button from '@/src/components/Button';
import VerificationInput from '@/src/components/VerificationInput';
import { ResetPasswordStep2Data } from '@/src/interfaces/ResetPassword';
import styles from './CodeVerificationStep.module.css';

interface CodeVerificationStepProps {
  email: string;
  onNext: (data: ResetPasswordStep2Data) => void;
  onBack: () => void;
}

export default function CodeVerificationStep({
  email,
  onNext,
  onBack,
}: CodeVerificationStepProps) {
  const handleVerificationComplete = (code: string) => {
    console.log('Verification code entered:', code);
  };

  const handleVerify = () => {
    // In real app, would validate the code here
    const data: ResetPasswordStep2Data = {
      verificationCode: '123456', // Mock data
    };
    console.log('Step 2 - Code Verification:', data);
    onNext(data);
  };

  const handleResend = () => {
    console.log('Resending reset code to:', email);
  };

  return (
    <div>
      <div className={styles.authHeader}>
        <h1 className={styles.authTitle}>Enter code</h1>
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
