'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/src/components/StepIndicator';
import AccountCreationStep from './AccountCreationStep';
import EmailVerificationStep from './EmailVerificationStep';
import ProfileCompletionStep from './ProfileCompletionStep';
import {
  RegisterStep1Data,
  RegisterStep2Data,
  RegisterStep3Data,
} from '@/src/interfaces/Register';
import styles from './Register.module.css';

export default function RegisterView() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<RegisterStep1Data | null>(null);
  const [step2Data, setStep2Data] = useState<RegisterStep2Data | null>(null);

  const handleStep1Complete = (data: RegisterStep1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: RegisterStep2Data) => {
    setStep2Data(data);
    setCurrentStep(3);
  };

  const handleStep3Complete = (data: RegisterStep3Data) => {
    // Combine all step data
    const completeData = {
      ...step1Data,
      ...step2Data,
      ...data,
    };

    console.log('Registration Complete - All Data:', completeData);

    // Navigate to returns page (mock success)
    router.push('/returns');
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const handleBackToStep2 = () => {
    setCurrentStep(2);
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <StepIndicator currentStep={currentStep} totalSteps={3} />

          {currentStep === 1 && (
            <AccountCreationStep onNext={handleStep1Complete} />
          )}

          {currentStep === 2 && step1Data && (
            <EmailVerificationStep
              email={step1Data.email}
              onNext={handleStep2Complete}
              onBack={handleBackToStep1}
            />
          )}

          {currentStep === 3 && (
            <ProfileCompletionStep
              onComplete={handleStep3Complete}
              onBack={handleBackToStep2}
            />
          )}
        </div>
      </div>
    </main>
  );
}
