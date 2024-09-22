// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './register.module.css';

export default function Register() {
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
      // Opcional: Redirigir al login o dashboard si es necesario
    } catch (err: any) {
      console.error('Error al registrar:', err.response?.data?.error || err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Iniciar Sesión</h2>
      <label htmlFor="">Nombre</label>
      <input className={styles.input} type="text" name="fullName" placeholder="Nombre Completo" onChange={handleChange} required />
      <input className={styles.input} type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
      <input className={styles.input} type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      <input className={styles.input} type="text" name="phoneNumber" placeholder="Número de Teléfono" onChange={handleChange} required />
      <input className={styles.input} type="number" name="age" placeholder="Edad" onChange={handleChange} required />
      <button className={styles.button} type="submit">Registrar</button>
    </form>
    </div>
    
  );
}
