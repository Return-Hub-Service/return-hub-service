'use client';

import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import ContactOptions from './ContactOptions';
import styles from './Help.module.css';

export default function HelpView() {
  return (
    <main className={styles.mainContent}>
      <div className={styles.helpContainer}>
        <div className={styles.helpCard}>
          <div className={styles.helpIcon}>❓</div>
          <h1 className={styles.helpTitle}>Need Help?</h1>
          <p className={styles.helpSubtitle}>
            Our support team is here to assist you with any questions about your package returns.
          </p>

          <ContactOptions />

          <div className={styles.hoursBox}>
            <h3 className={styles.hoursTitle}>Hours of Operation</h3>
            <p className={styles.hoursText}>
              Monday - Friday: 8:00 AM - 8:00 PM EST<br />
              Saturday: 9:00 AM - 5:00 PM EST<br />
              Sunday: Closed
            </p>
          </div>

          <Link href="/" className={styles.backButton}>
            <IconArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
