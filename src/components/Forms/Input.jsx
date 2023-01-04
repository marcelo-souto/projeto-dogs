import React from 'react';
import styles from './Input.module.css';

function Input({ id, label, type, onChange, value, erro, onBlur }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={id}
        name={id}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      {erro && <p className={styles.erro}>{erro}</p>}
    </div>
  );
}

export default Input;
