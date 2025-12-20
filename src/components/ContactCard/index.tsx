'use client';

import Link from 'next/link';
import styles from './ContactCard.module.css';

interface ContactCardProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function ContactCard({ href, icon, label, value }: ContactCardProps) {
  return (
    <Link href={href} className={styles.contactCard}>
      <div className={styles.contactIcon}>
        {icon}
      </div>
      <div className={styles.contactInfo}>
        <div className={styles.contactLabel}>{label}</div>
        <div className={styles.contactValue}>{value}</div>
      </div>
    </Link>
  );
}
