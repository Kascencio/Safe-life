"use client";

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      setErrorMessage(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Iniciar Sesión</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        {/* Etiqueta para el correo */}
        <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Correo Electrónico"
          onChange={handleChange}
          required
          className={styles.input}
        />

        {/* Etiqueta para la contraseña */}
        <label htmlFor="password" className={styles.label}>Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>
        <div className={styles.container_register}>
          <p>¿No tienes cuenta?</p>
          <a href="/register">Regístrate</a>
        </div>
      </form>
    </div>
  );
}
