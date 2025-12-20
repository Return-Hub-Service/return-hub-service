'use client';

import styles from './HeroSection.module.css';

interface HeroSectionProps {
  children: React.ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroBg}></div>
      <div className={styles.heroPattern}></div>
      <div className={styles.heroContent}>{children}</div>
    </div>
  );
}
