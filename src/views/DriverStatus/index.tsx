'use client';

import { useState } from 'react';
import {
  IconArrowRight,
  IconCheck,
  IconAlertTriangle,
  IconPackage,
  IconCamera,
} from '@tabler/icons-react';
import { FileInput } from '@mantine/core';
import Timeline from '@/src/components/Timeline';
import PackageItem from '@/src/components/PackageItem';
import Button from '@/src/components/Button';
import { DriverStatusType } from '@/src/interfaces/DriverStatus';
import { mockRouteInfo, mockPackages } from './mockData';
import styles from './DriverStatus.module.css';

export default function DriverStatusView() {
  const [currentStatus, setCurrentStatus] =
    useState<DriverStatusType>('on-the-way');
  const [packages, setPackages] = useState(mockPackages);
  const [returnReason, setReturnReason] = useState('');
  const [returnNotes, setReturnNotes] = useState('');

  const handlePackageToggle = (id: string) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === id ? { ...pkg, isChecked: !pkg.isChecked } : pkg
      )
    );
  };

  const checkedCount = packages.filter((pkg) => pkg.isChecked).length;

  const handleStatusChange = (newStatus: DriverStatusType) => {
    setCurrentStatus(newStatus);
  };

  const resetDemo = () => {
    setCurrentStatus('on-the-way');
    setPackages(mockPackages.map((pkg) => ({ ...pkg, isChecked: true })));
    setReturnReason('');
    setReturnNotes('');
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.driverContainer}>
        {/* Driver Header with Timeline */}
        <div className={styles.driverHeader}>
          <div className={styles.driverInfo}>
            <h1 className={styles.driverTitle}>
              <IconPackage size={28} /> Package Status
            </h1>
            <div className={styles.driverMeta}>
              Driver: {mockRouteInfo.driverName}
              <br />
              Route: {mockRouteInfo.routeName}
            </div>
          </div>

          <Timeline currentStatus={currentStatus} />
        </div>

        {/* Status Content - On The Way */}
        {currentStatus === 'on-the-way' && (
          <div className={styles.statusCard}>
            <h2 className={styles.statusContentTitle}>En Route to Pickup</h2>
            <p className={styles.statusSubtitle}>
              Navigate to the pickup location and collect all packages.
            </p>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>Pickup Location</div>
              <div className={styles.infoValue}>
                {mockRouteInfo.pickupAddress.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </div>
              <a href="#" className={styles.mapLink}>
                Open in Maps →
              </a>
            </div>

            <div className={styles.actionButtons}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<IconArrowRight size={20} />}
                onClick={() => handleStatusChange('picked-up')}
              >
                Confirm Arrival
              </Button>
            </div>
          </div>
        )}

        {/* Status Content - Picked Up */}
        {currentStatus === 'picked-up' && (
          <div className={styles.statusCard}>
            <h2 className={styles.statusContentTitle}>
              Confirm Package Pickup
            </h2>
            <p className={styles.statusSubtitle}>
              Please confirm that you have picked up all packages listed below:
            </p>

            <div className={styles.packageList}>
              {packages.map((pkg) => (
                <PackageItem
                  key={pkg.id}
                  packageItem={pkg}
                  onToggle={handlePackageToggle}
                />
              ))}
            </div>

            <div className={styles.warningBanner}>
              <IconAlertTriangle size={20} />
              Please ensure all packages are secured in your vehicle before
              proceeding.
            </div>

            <div className={styles.actionButtons}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<IconArrowRight size={20} />}
                onClick={() => handleStatusChange('delivered')}
              >
                Confirm Pickup ({checkedCount}/{packages.length})
              </Button>
            </div>
          </div>
        )}

        {/* Status Content - Delivered */}
        {currentStatus === 'delivered' && (
          <div className={styles.statusCard}>
            <h2 className={styles.statusContentTitle}>
              Delivery Confirmation
            </h2>
            <p className={styles.statusSubtitle}>
              Confirm packages have been delivered to the carrier drop-off
              location.
            </p>

            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>Drop-off Location</div>
              <div className={styles.infoValue}>
                {mockRouteInfo.dropoffAddress.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Upload Drop-off Receipt
              </label>
              <FileInput
                placeholder="Click to upload receipt photo"
                leftSection={<IconCamera size={20} />}
                accept="image/png,image/jpeg"
              />
            </div>

            <div className={styles.actionButtons}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<IconArrowRight size={20} />}
                onClick={() => handleStatusChange('complete')}
              >
                Confirm Delivery
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => handleStatusChange('returned')}
              >
                Couldn't Deliver - Return to Sender
              </Button>
            </div>
          </div>
        )}

        {/* Status Content - Returned */}
        {currentStatus === 'returned' && (
          <div className={styles.statusCard}>
            <h2 className={styles.statusContentTitle}>Return Packages</h2>
            <p className={styles.statusSubtitle}>
              Please return the packages to the original pickup location.
            </p>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Reason for Return</label>
              <select
                className={styles.selectInput}
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
              >
                <option value="">Select reason</option>
                <option value="closed">Drop-off location closed</option>
                <option value="refused">Package refused by carrier</option>
                <option value="damaged">Package damaged</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Additional Notes</label>
              <textarea
                className={styles.textareaInput}
                placeholder="Describe what happened..."
                value={returnNotes}
                onChange={(e) => setReturnNotes(e.target.value)}
              />
            </div>

            <div className={styles.actionButtons}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<IconCheck size={20} strokeWidth={3} />}
                onClick={() => handleStatusChange('complete')}
              >
                Confirm Return Complete
              </Button>
            </div>
          </div>
        )}

        {/* Status Content - Complete */}
        {currentStatus === 'complete' && (
          <div className={styles.statusCard}>
            <div className={styles.completeContainer}>
              <div className={styles.successCheckmark}>
                <IconCheck size={48} strokeWidth={3} />
              </div>
              <h2 className={styles.statusContentTitle}>Route Complete!</h2>
              <p className={styles.statusSubtitle}>
                All packages have been successfully delivered to carriers.
              </p>

              <div className={styles.summaryBox}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>
                    Packages Delivered
                  </span>
                  <span className={styles.summaryValue}>{packages.length}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Route Time</span>
                  <span className={styles.summaryValue}>45 min</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.earnings}`}>
                  <span className={styles.summaryLabel}>Earnings</span>
                  <span className={styles.summaryValue}>$12.50</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={resetDemo}
              >
                Start New Route
              </Button>
            </div>
          </div>
        )}

        {/* Demo Controls */}
        <div className={styles.demoControls}>
          <h3 className={styles.demoTitle}>Demo: Jump to Status</h3>
          <div className={styles.demoButtons}>
            <Button
              variant="primary"
              size="md"
              onClick={() => handleStatusChange('on-the-way')}
            >
              On the Way
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleStatusChange('picked-up')}
            >
              Picked Up
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleStatusChange('delivered')}
            >
              Delivered
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleStatusChange('returned')}
            >
              Returned
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleStatusChange('complete')}
            >
              Complete
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
