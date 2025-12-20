'use client';

import { IconX, IconCamera, IconQrcode } from '@tabler/icons-react';
import { FileInput } from '@mantine/core';
import { PackageInfo } from '@/src/interfaces/SchedulePickup';
import styles from './PackageEntry.module.css';

interface PackageEntryProps {
  packageNumber: number;
  packageData: PackageInfo;
  onChange: (data: Partial<PackageInfo>) => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

const CARRIERS = [
  { value: 'amazon', label: 'Amazon' },
  { value: 'ups', label: 'UPS' },
  { value: 'fedex', label: 'FedEx' },
  { value: 'usps', label: 'USPS' },
  { value: 'dhl', label: 'DHL' },
];

const SIZES = [
  { value: 'small', label: 'Small (fits in mailbox)' },
  { value: 'medium', label: 'Medium (shoebox)' },
  { value: 'large', label: 'Large (moving box)' },
  { value: 'xlarge', label: 'Extra Large (furniture)' },
];

const WEIGHTS = [
  { value: 'light', label: 'Light (under 5 lbs)' },
  { value: 'medium', label: 'Medium (5-20 lbs)' },
  { value: 'heavy', label: 'Heavy (20-50 lbs)' },
  { value: 'very-heavy', label: 'Very Heavy (50+ lbs)' },
];

export default function PackageEntry({
  packageNumber,
  packageData,
  onChange,
  onRemove,
  showRemove = false,
}: PackageEntryProps) {
  return (
    <div className={styles.packageEntry}>
      <div className={styles.packageEntryHeader}>
        <span className={styles.packageNumber}>Package {packageNumber}</span>
        {showRemove && onRemove && (
          <button className={styles.removePackage} onClick={onRemove}>
            <IconX size={20} />
          </button>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Carrier <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.selectInput}
            value={packageData.carrier}
            onChange={(e) => onChange({ carrier: e.target.value })}
          >
            <option value="">Select carrier</option>
            {CARRIERS.map((carrier) => (
              <option key={carrier.value} value={carrier.value}>
                {carrier.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tracking Number</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="1Z999AA10123456784"
            value={packageData.trackingNumber || ''}
            onChange={(e) => onChange({ trackingNumber: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Estimated Size <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.selectInput}
            value={packageData.size}
            onChange={(e) => onChange({ size: e.target.value })}
          >
            <option value="">Select size</option>
            {SIZES.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Estimated Weight <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.selectInput}
            value={packageData.weight}
            onChange={(e) => onChange({ weight: e.target.value })}
          >
            <option value="">Select weight</option>
            {WEIGHTS.map((weight) => (
              <option key={weight.value} value={weight.value}>
                {weight.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Package Images</label>
        <FileInput
          placeholder="Click to upload or drag and drop"
          description="PNG, JPG up to 10MB"
          leftSection={<IconCamera size={20} />}
          multiple
          accept="image/png,image/jpeg"
          onChange={(files) => onChange({ images: files || [] })}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Return QR Code</label>
        <FileInput
          placeholder="Upload QR code if available"
          leftSection={<IconQrcode size={20} />}
          accept="image/png,image/jpeg"
          onChange={(file) => onChange({ qrCode: file || undefined })}
        />
      </div>
    </div>
  );
}
