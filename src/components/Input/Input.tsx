import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: 'text' | 'password';
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, error, type }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;