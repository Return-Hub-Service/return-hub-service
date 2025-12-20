'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  IconUser,
  IconMapPin,
  IconPackage,
  IconCalendar,
  IconPlus,
  IconArrowRight,
} from '@tabler/icons-react';
import FormCard from '@/src/components/FormCard';
import PackageEntry from '@/src/components/PackageEntry';
import DateTimePicker from '@/src/components/DateTimePicker';
import Button from '@/src/components/Button';
import {
  ContactInfo,
  PickupAddress,
  PackageInfo,
  PickupPreferences,
} from '@/src/interfaces/SchedulePickup';
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from '@/src/utils/formValidation';
import styles from './SchedulePickup.module.css';

const US_STATES = [
  { value: 'NC', label: 'North Carolina' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'GA', label: 'Georgia' },
  { value: 'VA', label: 'Virginia' },
];

const PACKAGE_LOCATIONS = [
  { value: 'front-door', label: 'Front door' },
  { value: 'back-door', label: 'Back door' },
  { value: 'porch', label: 'Porch' },
  { value: 'garage', label: 'Garage' },
  { value: 'mailroom', label: 'Mailroom/lobby' },
  { value: 'other', label: 'Other (specify in notes)' },
];

export default function SchedulePickupView() {
  const router = useRouter();

  const [contact, setContact] = useState<ContactInfo>({
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  const [address, setAddress] = useState<PickupAddress>({
    street: '',
    unit: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [packages, setPackages] = useState<PackageInfo[]>([
    {
      id: '1',
      carrier: '',
      trackingNumber: '',
      size: '',
      weight: '',
    },
  ]);

  const [preferences, setPreferences] = useState<PickupPreferences>({
    preferredDate: '',
    timeWindow: '',
    packageLocation: '',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddPackage = () => {
    setPackages([
      ...packages,
      {
        id: String(packages.length + 1),
        carrier: '',
        trackingNumber: '',
        size: '',
        weight: '',
      },
    ]);
  };

  const handleRemovePackage = (id: string) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const handlePackageChange = (id: string, data: Partial<PackageInfo>) => {
    setPackages(
      packages.map((pkg) => (pkg.id === id ? { ...pkg, ...data } : pkg))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Validate contact info
    const nameError = validateRequired(contact.fullName, 'Full name');
    const phoneError = validatePhone(contact.phoneNumber);
    const emailError = validateEmail(contact.email);

    if (nameError) newErrors.fullName = nameError;
    if (phoneError) newErrors.phoneNumber = phoneError;
    if (emailError) newErrors.email = emailError;

    // Validate address
    if (!address.street) newErrors.street = 'Street address is required';
    if (!address.city) newErrors.city = 'City is required';
    if (!address.state) newErrors.state = 'State is required';
    if (!address.zipCode) newErrors.zipCode = 'ZIP code is required';

    // Validate packages
    packages.forEach((pkg, index) => {
      if (!pkg.carrier)
        newErrors[`package${index}Carrier`] = 'Carrier is required';
      if (!pkg.size) newErrors[`package${index}Size`] = 'Size is required';
      if (!pkg.weight)
        newErrors[`package${index}Weight`] = 'Weight is required';
    });

    // Validate preferences
    if (!preferences.preferredDate)
      newErrors.preferredDate = 'Preferred date is required';
    if (!preferences.timeWindow)
      newErrors.timeWindow = 'Time window is required';
    if (!preferences.packageLocation)
      newErrors.packageLocation = 'Package location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      contact,
      address,
      packages,
      preferences,
    };

    console.log('Schedule Pickup Form Submitted:', formData);

    // Navigate to returns page (mock success)
    router.push('/returns');
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.requestContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Schedule a Return Pickup</h1>
          <p className={styles.pageSubtitle}>
            We'll pick up your packages and deliver them to the carrier
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Contact Information */}
          <FormCard title="Contact Information" icon={<IconUser size={20} />}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Full Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`${styles.formInput} ${errors.fullName ? styles.error : ''}`}
                  placeholder="John Doe"
                  value={contact.fullName}
                  onChange={(e) => {
                    setContact({ ...contact, fullName: e.target.value });
                    setErrors({ ...errors, fullName: '' });
                  }}
                />
                {errors.fullName && (
                  <p className={styles.errorMessage}>{errors.fullName}</p>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Phone Number <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  className={`${styles.formInput} ${errors.phoneNumber ? styles.error : ''}`}
                  placeholder="(555) 123-4567"
                  value={contact.phoneNumber}
                  onChange={(e) => {
                    setContact({ ...contact, phoneNumber: e.target.value });
                    setErrors({ ...errors, phoneNumber: '' });
                  }}
                />
                {errors.phoneNumber && (
                  <p className={styles.errorMessage}>{errors.phoneNumber}</p>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                placeholder="you@example.com"
                value={contact.email}
                onChange={(e) => {
                  setContact({ ...contact, email: e.target.value });
                  setErrors({ ...errors, email: '' });
                }}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email}</p>
              )}
            </div>
          </FormCard>

          {/* Pickup Address */}
          <FormCard title="Pickup Address" icon={<IconMapPin size={20} />}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Street Address <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className={`${styles.formInput} ${errors.street ? styles.error : ''}`}
                placeholder="123 Main Street"
                value={address.street}
                onChange={(e) => {
                  setAddress({ ...address, street: e.target.value });
                  setErrors({ ...errors, street: '' });
                }}
              />
              {errors.street && (
                <p className={styles.errorMessage}>{errors.street}</p>
              )}
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Apt/Suite/Unit</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Apt 4B"
                  value={address.unit}
                  onChange={(e) =>
                    setAddress({ ...address, unit: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  City <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`${styles.formInput} ${errors.city ? styles.error : ''}`}
                  placeholder="Hendersonville"
                  value={address.city}
                  onChange={(e) => {
                    setAddress({ ...address, city: e.target.value });
                    setErrors({ ...errors, city: '' });
                  }}
                />
                {errors.city && (
                  <p className={styles.errorMessage}>{errors.city}</p>
                )}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  State <span className={styles.required}>*</span>
                </label>
                <select
                  className={`${styles.selectInput} ${errors.state ? styles.error : ''}`}
                  value={address.state}
                  onChange={(e) => {
                    setAddress({ ...address, state: e.target.value });
                    setErrors({ ...errors, state: '' });
                  }}
                >
                  <option value="">Select state</option>
                  {US_STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className={styles.errorMessage}>{errors.state}</p>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  ZIP Code <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`${styles.formInput} ${errors.zipCode ? styles.error : ''}`}
                  placeholder="28792"
                  value={address.zipCode}
                  onChange={(e) => {
                    setAddress({ ...address, zipCode: e.target.value });
                    setErrors({ ...errors, zipCode: '' });
                  }}
                />
                {errors.zipCode && (
                  <p className={styles.errorMessage}>{errors.zipCode}</p>
                )}
              </div>
            </div>
          </FormCard>

          {/* Package Information */}
          <FormCard
            title="Package Information"
            icon={<IconPackage size={20} />}
          >
            {packages.map((pkg, index) => (
              <PackageEntry
                key={pkg.id}
                packageNumber={index + 1}
                packageData={pkg}
                onChange={(data) => handlePackageChange(pkg.id, data)}
                onRemove={
                  packages.length > 1
                    ? () => handleRemovePackage(pkg.id)
                    : undefined
                }
                showRemove={packages.length > 1}
              />
            ))}
            <button
              type="button"
              className={styles.addPackageBtn}
              onClick={handleAddPackage}
            >
              <IconPlus size={20} />
              Add Another Package
            </button>
          </FormCard>

          {/* Pickup Preferences */}
          <FormCard
            title="Pickup Preferences"
            icon={<IconCalendar size={20} />}
          >
            <DateTimePicker
              selectedDate={preferences.preferredDate}
              selectedTime={preferences.timeWindow}
              onDateChange={(date) =>
                setPreferences({ ...preferences, preferredDate: date })
              }
              onTimeChange={(time) =>
                setPreferences({ ...preferences, timeWindow: time })
              }
            />

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Package Location <span className={styles.required}>*</span>
              </label>
              <select
                className={`${styles.selectInput} ${errors.packageLocation ? styles.error : ''}`}
                value={preferences.packageLocation}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    packageLocation: e.target.value,
                  })
                }
              >
                <option value="">Where will packages be?</option>
                {PACKAGE_LOCATIONS.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
              {errors.packageLocation && (
                <p className={styles.errorMessage}>{errors.packageLocation}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Additional Notes</label>
              <textarea
                className={styles.textareaInput}
                placeholder="Any special instructions for the driver (e.g., gate code, doorbell doesn't work, etc.)"
                value={preferences.additionalNotes}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    additionalNotes: e.target.value,
                  })
                }
              />
            </div>
          </FormCard>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={<IconArrowRight size={20} />}
          >
            Submit Return Request
          </Button>
        </form>
      </div>
    </main>
  );
}
