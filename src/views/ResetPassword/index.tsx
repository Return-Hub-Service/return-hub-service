'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/src/components/StepIndicator';
import EmailInputStep from './EmailInputStep';
import CodeVerificationStep from './CodeVerificationStep';
import NewPasswordStep from './NewPasswordStep';
import {
  ResetPasswordStep1Data,
  ResetPasswordStep2Data,
  ResetPasswordStep3Data,
} from '@/src/interfaces/ResetPassword';
import styles from './ResetPassword.module.css';

export default function ResetPasswordView() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<ResetPasswordStep1Data | null>(
    null
  );
  const [step2Data, setStep2Data] = useState<ResetPasswordStep2Data | null>(
    null
  );

  const handleStep1Complete = (data: ResetPasswordStep1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: ResetPasswordStep2Data) => {
    setStep2Data(data);
    setCurrentStep(3);
  };

  const handleStep3Complete = (data: ResetPasswordStep3Data) => {
    // Combine all step data
    const completeData = {
      ...step1Data,
      ...step2Data,
      ...data,
    };

    console.log('Password Reset Complete - All Data:', completeData);

    // Navigate to login page (mock success)
    router.push('/login');
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <StepIndicator currentStep={currentStep} totalSteps={3} />

          {currentStep === 1 && (
            <EmailInputStep onNext={handleStep1Complete} />
          )}

          {currentStep === 2 && step1Data && (
            <CodeVerificationStep
              email={step1Data.email}
              onNext={handleStep2Complete}
              onBack={handleBackToStep1}
            />
          )}

          {currentStep === 3 && (
            <NewPasswordStep onComplete={handleStep3Complete} />
          )}
        </div>
      </div>
    </main>
  );
}
