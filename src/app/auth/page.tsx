'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './auth.module.scss';
import { saveUserToLocalStorage } from '../../utils/auth';
import { User } from '../../types/user';

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const handleLogin = async () => {
    if (!validatePhone(phone)) {
      setError('لطفاً شماره تلفن معتبر ایران وارد کنید (09xxxxxxxxx)');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
      const data = await response.json();
      const user: User = data.results[0];
      
      saveUserToLocalStorage(user);
      router.push('/dashboard');
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>ورود به سیستم</h1>
        <form className={styles.form}>
          <Input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError('');
            }}
            placeholder="شماره تلفن (09xxxxxxxxx)"
            error={error}
          />
          <Button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'در حال پردازش...' : 'ورود'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;