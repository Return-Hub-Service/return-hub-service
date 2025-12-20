import Link from 'next/link';
import { IconActivity, IconTag, IconUser } from '@tabler/icons-react';
import styles from './SecondaryNav.module.css';

interface SecondaryNavProps {
  userName?: string;
}

export default function SecondaryNav({ userName = 'User' }: SecondaryNavProps) {
  return (
    <div className={styles.secondaryNav}>
      <div className={styles.secondaryNavInner}>
        <div className={styles.welcomeText}>Welcome back, {userName}</div>
        <div className={styles.secondaryLinks}>
          <Link href="/returns" className={styles.secondaryLink}>
            <IconActivity size={16} />
            Activity
          </Link>
          <Link href="#" className={styles.secondaryLink}>
            <IconTag size={16} />
            Promotions
          </Link>
          <Link href="#" className={styles.secondaryLink}>
            <IconUser size={16} />
            Account
          </Link>
        </div>
      </div>
    </div>
  );
}
