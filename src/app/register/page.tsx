// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    age: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      console.log(response.data.message);
      // Mostrar notificación de registro exitoso
      toast.success('Registro exitoso', {
        position: 'top-right',
        autoClose: 3000, // Cierra la notificación después de 3 segundos
        onClose: () => router.push('/login'), // Redirige después de cerrar
      });
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      console.error('Error al registrar:', error.response?.data?.error || error.message);
      toast.error('Error al registrar');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Registro</h2>
        <input
          className={styles.input}
          type="text"
          name="fullName"
          placeholder="Nombre Completo"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="text"
          name="phoneNumber"
          placeholder="Número de Teléfono"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="number"
          name="age"
          placeholder="Edad"
          onChange={handleChange}
          required
        />
        <button className={styles.button} type="submit">
          Registrar
        </button>
        <div className="container_login">
          <p>
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
