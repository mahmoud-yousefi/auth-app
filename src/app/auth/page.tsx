'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import styles from './auth.module.scss';
import { saveUserToLocalStorage } from '@/utils/auth';
import { User } from '@/types/user';
import { urls } from '@/config/urls';

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePhone(phone)) {
      setError('لطفاً شماره تلفن معتبر ایران وارد کنید (09xxxxxxxxx)');
      return;
    }

    if (!validatePassword(password)) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(urls.baseUrl);
      if (!response.ok) throw new Error('خطا در ارتباط با سرور');
      const data = await response.json();
      const user: User = data.results[0];

      saveUserToLocalStorage(user);
      setSuccess('ورود با موفقیت انجام شد! در حال انتقال...');
      setTimeout(() => router.push('/auth-app/dashboard'), 1000);
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.log(error);
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
            error={error && phone && !validatePhone(phone) ? error : ''}
          />
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="رمز عبور"
            type="password"
            error={error && password && !validatePassword(password) ? error : ''}
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
            <a href="#" className={styles.forgot}>فراموشی رمز عبور؟</a>
          </div>
          {success && <p className={styles.success}>{success}</p>}
          {error && !success && <p className={styles.error}>{error}</p>}
          <Button disabled={isLoading}>
            {isLoading ? (
              <span className={styles.spinner}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V2m0 20v-2m8-8h2m-20 0H2m16.364-6.364l-1.414-1.414M7.05 17.05l-1.414-1.414m12.728 0l-1.414 1.414M7.05 7.05l-1.414 1.414" stroke="white" strokeWidth="2" />
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