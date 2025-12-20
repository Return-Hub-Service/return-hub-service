'use client';

import { IconCheck } from '@tabler/icons-react';
import { PackageItem as PackageItemType } from '@/src/interfaces/DriverStatus';
import styles from './PackageItem.module.css';

interface PackageItemProps {
  packageItem: PackageItemType;
  onToggle: (id: string) => void;
}

export default function PackageItem({
  packageItem,
  onToggle,
}: PackageItemProps) {
  return (
    <div
      className={`${styles.packageItem} ${packageItem.isChecked ? styles.selected : ''}`}
      onClick={() => onToggle(packageItem.id)}
    >
      <div className={styles.packageInfo}>
        <div className={styles.packageId}>{packageItem.packageId}</div>
        <div className={styles.packageMeta}>
          {packageItem.customerName} ({packageItem.unit}) | {packageItem.carrier}
          {packageItem.trackingNumber && ` | ${packageItem.trackingNumber}`}
        </div>
      </div>
      <div
        className={`${styles.packageCheckbox} ${packageItem.isChecked ? styles.checked : ''}`}
      >
        {packageItem.isChecked && <IconCheck size={16} />}
      </div>
    </div>
  );
}
