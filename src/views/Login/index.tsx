'use client';

import Link from 'next/link';
import LoginForm from './LoginForm';
import SocialLoginButton from './SocialLoginButton';
import styles from './Login.module.css';

export default function LoginView() {
  return (
    <main className={styles.mainContent}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Welcome back</h1>
          <p className={styles.authSubtitle}>Sign in to your account to continue</p>

          <LoginForm />

          <div className={styles.divider}>
            <span className={styles.dividerText}>Or</span>
          </div>

          <SocialLoginButton />

          <p className={styles.signupPrompt}>
            Don't have an account?{' '}
            <Link href="/register" className={styles.signupLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
