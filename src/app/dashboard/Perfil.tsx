// src/app/dashboard/Perfil.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './perfil.module.css';
import { useCallback } from 'react';

interface PerfilProps {
  userId: number;
}

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  age: number;
}

export default function Perfil({ userId }: PerfilProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUserProfile(response.data);
    } catch (err) {
      console.error('Error al obtener el perfil:', err);
    }
  },[userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${userId}`, userProfile);
      setIsEditing(false);
    } catch (err) {
      console.error('Error al actualizar el perfil:', err);
    }
  };

  if (!userProfile) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className={styles.perfil}>
      <h2>Perfil</h2>
      {isEditing ? (
        <div>
          <label>
            Nombre Completo:
            <input
              type="text"
              name="fullName"
              value={userProfile.fullName}
              onChange={handleChange}
            />
          </label>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={userProfile.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Número de Teléfono:
            <input
              type="text"
              name="phoneNumber"
              value={userProfile.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Edad:
            <input
              type="number"
              name="age"
              value={userProfile.age}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <p><strong>Nombre Completo:</strong> {userProfile.fullName}</p>
          <p><strong>Correo Electrónico:</strong> {userProfile.email}</p>
          <p><strong>Número de Teléfono:</strong> {userProfile.phoneNumber}</p>
          <p><strong>Edad:</strong> {userProfile.age}</p>
          <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
        </div>
      )}
    </div>
  );
}
