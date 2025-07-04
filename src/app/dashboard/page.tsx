'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../components/Button/Button';
import { getUserFromLocalStorage, clearUserFromLocalStorage } from '../../utils/auth';
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
        {user && <p className={styles.greeting}>سلام، {user.name.first} {user.name.last}</p>}
        <Button onClick={handleLogout}>خروج</Button>
      </div>
    </div>
  );
};

export default DashboardPage;