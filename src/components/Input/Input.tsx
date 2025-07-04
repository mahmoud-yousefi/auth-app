import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, error }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
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