'use client';

import { IconCheck } from '@tabler/icons-react';
import styles from './StepIndicator.module.css';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className={styles.stepsIndicator}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={stepNumber} className={styles.stepGroup}>
            <div
              className={`${styles.stepDot} ${
                isCompleted ? styles.completed : ''
              } ${isActive ? styles.active : ''}`}
            >
              {isCompleted ? <IconCheck size={16} /> : stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`${styles.stepConnector} ${
                  isCompleted ? styles.completed : ''
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
