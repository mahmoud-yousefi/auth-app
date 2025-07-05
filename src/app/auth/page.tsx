'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import styles from './auth.module.scss';
import { saveUserToLocalStorage } from '@/utils/auth';
import { validatePhone, validatePassword, validationMessages } from '@/utils/validation';
import { User } from '@/types/user';
import { urls } from '@/config/urls';

const AuthPage: React.FC = () => {
  console.log('[AuthPage] Component mounted');

  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [phoneValidation, setPhoneValidation] = useState({ isValid: true, error: '' });
  const [passwordValidation, setPasswordValidation] = useState({ isValid: true, error: '' });

  useEffect(() => {
    setPhoneValidation(validatePhone(phone));
    setPasswordValidation(validatePassword(password));
  }, [phone, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    console.log('[AuthPage] Handle login triggered');

    if (!phoneValidation.isValid) {
      setError(phoneValidation.error);
      console.log('[AuthPage] Phone validation failed:', phoneValidation.error);
      return;
    }

    if (!passwordValidation.isValid) {
      setError(passwordValidation.error);
      console.log('[AuthPage] Password validation failed:', passwordValidation.error);
      return;
    }

    setIsLoading(true);
    try {
      console.log('[AuthPage] Fetching from:', urls.baseUrl);
      const response = await fetch(urls.baseUrl);
      if (!response.ok) throw new Error(validationMessages.serverError);
      const data = await response.json();
      const user: User = data.results[0];
      console.log('[AuthPage] User fetched:', user);

      saveUserToLocalStorage(user);
      setSuccess('ورود با موفقیت انجام شد! در حال انتقال...');
      console.log('[AuthPage] Redirecting to /dashboard');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error) {
      setError(validationMessages.serverError);
      console.error('[AuthPage] Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#007bff">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <h1 className={styles.title}>ورود به سیستم</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError('');
            }}
            placeholder="شماره تلفن (09xxxxxxxxx)"
            error={error && phoneValidation.error ? error : ''}
          />
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="رمز عبور"
            type="password"
            error={error && passwordValidation.error ? error : ''}
          />
          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>مرا به خاطر بسپار</span>
            </label>
            <a href="#" className={styles.forgot}>
              فراموشی رمز عبور؟
            </a>
          </div>
          {success && <p className={styles.success}>{success}</p>}
          {error && !success && <p className={styles.error}>{error}</p>}
          <Button disabled={isLoading}>
            {isLoading ? (
              <span className={styles.spinner}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4V2m0 20v-2m8-8h2m-20 0H2m16.364-6.364l-1.414-1.414M7.05 17.05l-1.414-1.414m12.728 0l-1.414 1.414M7.05 7.05l-1.414 1.414"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            ) : (
              'ورود'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;