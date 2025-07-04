'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromLocalStorage } from '../utils/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  }, [router]);

  return null;
}