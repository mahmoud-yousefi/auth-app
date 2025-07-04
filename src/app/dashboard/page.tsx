// src/app/dashboard/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { getUserFromLocalStorage, clearUserFromLocalStorage } from '@/utils/auth';
import styles from './dashboard.module.scss';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user) {
      router.push('/auth');
    }
  }, [router]);

  const user = getUserFromLocalStorage();

  const handleLogout = () => {
    clearUserFromLocalStorage();
    router.push('/auth');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>خوش آمدید به داشبورد</h1>
        {user && (
          <div className={styles.profile}>
            <Image
              src={`/auth-app/${user.picture?.large || '/default-avatar.png'}`}
              alt={`${user.name.first} ${user.name.last}`}
              width={100}
              height={100}
              className={styles.avatar}
            />
            <div className={styles.details}>
              <p className={styles.greeting}>سلام، {user.name.first} {user.name.last}</p>
              <p className={styles.info}>ایمیل: {user.email}</p>
              {user.phone && <p className={styles.info}>تلفن: {user.phone}</p>}
            </div>
          </div>
        )}
        <Button onClick={handleLogout}>خروج</Button>
      </div>
    </div>
  );
};

export default DashboardPage;