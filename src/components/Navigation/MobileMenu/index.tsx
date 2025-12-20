'use client';

import Link from 'next/link';
import { IconX } from '@tabler/icons-react';
import { User } from '@/src/interfaces/Navigation';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated?: boolean;
  user?: User;
}

export default function MobileMenu({ isOpen, onClose, isAuthenticated, user }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.mobileMenu}>
      <div className={styles.mobileMenuHeader}>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close menu">
          <IconX size={24} />
        </button>
      </div>

      <div className={styles.mobileMenuContent}>
        <Link href="/schedule-pickup" className={styles.mobileMenuLink} onClick={onClose}>
          Return
        </Link>
        <Link href="/driver/order/demo" className={styles.mobileMenuLink} onClick={onClose}>
          Earn
        </Link>
        <Link href="/help" className={styles.mobileMenuLink} onClick={onClose}>
          About
        </Link>
        <Link href="/help" className={styles.mobileMenuLink} onClick={onClose}>
          Help
        </Link>

        {isAuthenticated && user ? (
          <div className={styles.mobileUserSection}>
            <div className={styles.mobileUserInfo}>
              <div className={styles.mobileUserName}>{user.name}</div>
              <div className={styles.mobileUserEmail}>{user.email}</div>
            </div>
            <Link href="/returns" className={styles.mobileMenuLink} onClick={onClose}>
              My Orders
            </Link>
            <Link href="/schedule-pickup" className={styles.mobileMenuLink} onClick={onClose}>
              New Return
            </Link>
            <button className={styles.mobileSignOut} onClick={onClose}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className={styles.mobileAuth}>
            <Link
              href="/login"
              className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}
              onClick={onClose}
            >
              Log in
            </Link>
            <Link
              href="/register"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}
              onClick={onClose}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
