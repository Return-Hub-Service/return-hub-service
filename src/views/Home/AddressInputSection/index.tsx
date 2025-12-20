'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconMapPin, IconArrowRight } from '@tabler/icons-react';
import { AddressSuggestion } from '@/src/interfaces/Home';
import styles from './AddressInputSection.module.css';

const mockSuggestions: AddressSuggestion[] = [
  {
    id: '1',
    main: '123 Main Street',
    sub: 'Hendersonville, NC 28792',
    fullAddress: {
      street: '123 Main Street',
      city: 'Hendersonville',
      state: 'NC',
      zip: '28792',
      formatted: '123 Main Street, Hendersonville, NC 28792',
    },
  },
  {
    id: '2',
    main: '456 Oak Avenue',
    sub: 'Asheville, NC 28801',
    fullAddress: {
      street: '456 Oak Avenue',
      city: 'Asheville',
      state: 'NC',
      zip: '28801',
      formatted: '456 Oak Avenue, Asheville, NC 28801',
    },
  },
  {
    id: '3',
    main: '789 Pine Road',
    sub: 'Fletcher, NC 28732',
    fullAddress: {
      street: '789 Pine Road',
      city: 'Fletcher',
      state: 'NC',
      zip: '28732',
      formatted: '789 Pine Road, Fletcher, NC 28732',
    },
  },
];

export default function AddressInputSection() {
  const [address, setAddress] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const selectAddress = (suggestion: AddressSuggestion) => {
    setAddress(suggestion.fullAddress.formatted);
    setShowSuggestions(false);
    console.log('Selected address:', suggestion.fullAddress);
  };

  return (
    <div className={styles.heroCard}>
      <h1 className={styles.heroTitle}>Where should we pick up your return?</h1>
      <p className={styles.heroSubtitle}>
        We'll pick up your packages and drop them off at the carrier for you.
      </p>

      <div className={styles.addressInputWrapper}>
        <span className={styles.addressInputIcon}>
          <IconMapPin size={20} />
        </span>
        <input
          type="text"
          className={styles.addressInput}
          placeholder="Enter your address"
          value={address}
          onChange={handleInputChange}
          onFocus={() => address && setShowSuggestions(true)}
        />

        {showSuggestions && (
          <div className={styles.addressSuggestions}>
            {mockSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={styles.suggestionItem}
                onClick={() => selectAddress(suggestion)}
              >
                <span className={styles.suggestionIcon}>
                  <IconMapPin size={16} />
                </span>
                <div className={styles.suggestionText}>
                  <div className={styles.suggestionMain}>{suggestion.main}</div>
                  <div className={styles.suggestionSub}>{suggestion.sub}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link href="/schedule-pickup" className={styles.continueButton}>
        Continue
        <IconArrowRight size={20} />
      </Link>
    </div>
  );
}
