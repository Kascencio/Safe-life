// src/app/dashboard/Alergias.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCallback } from 'react';
import styles from './alergias.module.css';

interface AlergiasProps {
  userId: number;
}

interface Alergia {
  id: number;
  nombre: string;
}

export default function Alergias({ userId }: AlergiasProps) {
  const [alergias, setAlergias] = useState<Alergia[]>([]);
  const [nuevaAlergia, setNuevaAlergia] = useState('');

  const fetchAlergias = useCallback(async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/alergias`);
      setAlergias(response.data);
    } catch (err) {
      console.error('Error al obtener las alergias:', err);
    }
  },[userId]);

  useEffect(() => {
    fetchAlergias();
  }, [fetchAlergias]);  

  const handleAdd = async () => {
    try {
      await axios.post(`/api/users/${userId}/alergias`, { nombre: nuevaAlergia });
      setNuevaAlergia('');
      fetchAlergias();
    } catch (err) {
      console.error('Error al agregar la alergia:', err);
    }
  };

  const handleDelete = async (alergiaId: number) => {
    try {
      await axios.delete(`/api/users/${userId}/alergias/${alergiaId}`);
      fetchAlergias();
    } catch (err) {
      console.error('Error al eliminar la alergia:', err);
    }
  };

  return (
    <div className={styles.alergias}>
      <h2>Alergias</h2>
      <div className={styles.containerall}>
      <ul>
        {alergias.map((alergia) => (
          <li key={alergia.id}>
            {alergia.nombre}
            <button onClick={() => handleDelete(alergia.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={nuevaAlergia}
        onChange={(e) => setNuevaAlergia(e.target.value)}
        placeholder="Nueva Alergia"
      />
      <button className={styles.addButton} onClick={handleAdd}>Agregar Alergia</button>
     </div>
    </div>
  );
}
