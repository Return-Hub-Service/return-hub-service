'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconMenu2 } from '@tabler/icons-react';
import MobileMenu from './MobileMenu';
import UserDropdown from './UserDropdown';
import { NavigationProps } from '@/src/interfaces/Navigation';
import styles from './Navigation.module.css';

export default function Navigation({ isAuthenticated = false, user }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className={styles.navContainer}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>📦</div>
            ReturnRun
          </Link>

          <div className={styles.navLinks}>
            <Link href="/schedule-pickup" className={styles.navLink}>
              Return
            </Link>
            <Link href="/driver/order/demo" className={styles.navLink}>
              Earn
            </Link>
            <Link href="/help" className={styles.navLink}>
              About
            </Link>
            <Link href="/help" className={styles.navLink}>
              Help
            </Link>
          </div>

          <div className={styles.navRight}>
            {isAuthenticated && user ? (
              <UserDropdown user={user} />
            ) : (
              <div className={styles.navAuthButtons}>
                <Link href="/login" className={`${styles.btn} ${styles.btnGhost}`}>
                  Log in
                </Link>
                <Link href="/register" className={`${styles.btn} ${styles.btnWhite}`}>
                  Sign up
                </Link>
              </div>
            )}
            <button
              className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <IconMenu2 size={24} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    </>
  );
}
