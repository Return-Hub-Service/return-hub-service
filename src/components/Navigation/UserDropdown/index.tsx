'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { IconChevronDown, IconPackage, IconPlus, IconLogout } from '@tabler/icons-react';
import { User } from '@/src/interfaces/Navigation';
import styles from './UserDropdown.module.css';

interface UserDropdownProps {
  user: User;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = () => {
    console.log('Sign out clicked');
    setIsOpen(false);
  };

  return (
    <div className={styles.userDropdown} ref={dropdownRef}>
      <button
        className={styles.userButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className={styles.userAvatar}>{user.name.charAt(0).toUpperCase()}</div>
        <span className={styles.userName}>{user.name.split(' ')[0]}</span>
        <IconChevronDown size={16} className={isOpen ? styles.iconRotated : ''} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownUserName}>{user.name}</div>
            <div className={styles.dropdownUserEmail}>{user.email}</div>
          </div>

          <div className={styles.dropdownDivider} />

          <Link href="/returns" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>
            <IconPackage size={18} />
            My Orders
          </Link>

          <Link
            href="/schedule-pickup"
            className={styles.dropdownItem}
            onClick={() => setIsOpen(false)}
          >
            <IconPlus size={18} />
            New Return
          </Link>

          <div className={styles.dropdownDivider} />

          <button className={styles.dropdownItemDanger} onClick={handleSignOut}>
            <IconLogout size={18} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
