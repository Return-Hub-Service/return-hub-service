import { ReactNode } from 'react';
import styles from './FormCard.module.css';

interface FormCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function FormCard({ title, icon, children }: FormCardProps) {
  return (
    <div className={styles.formCard}>
      <h2 className={styles.formSectionTitle}>
        <span className={styles.sectionIcon}>{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}
