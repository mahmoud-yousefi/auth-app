import { User } from '../types/user';

export const saveUserToLocalStorage = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUserFromLocalStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const clearUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};