'use client';

import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import styles from './VerificationInput.module.css';

interface VerificationInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export default function VerificationInput({
  length = 6,
  onComplete,
}: VerificationInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Move to next input if value entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (newValues.every((v) => v !== '')) {
      onComplete?.(newValues.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);

    // Only process if pasted data contains only numbers
    if (!/^\d+$/.test(pasteData)) return;

    const newValues = [...values];
    pasteData.split('').forEach((char, i) => {
      if (i < length) {
        newValues[i] = char;
      }
    });
    setValues(newValues);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newValues.findIndex((v) => v === '');
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    // Check if complete
    if (newValues.every((v) => v !== '')) {
      onComplete?.(newValues.join(''));
    }
  };

  return (
    <div className={styles.verificationInputs}>
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className={styles.verificationInput}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
        />
      ))}
    </div>
  );
}
