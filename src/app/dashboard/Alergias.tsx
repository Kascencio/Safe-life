'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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

  // Llamada a la API para obtener las alergias
  const fetchAlergias = useCallback(async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/alergias`);
      setAlergias(response.data);
    } catch (err) {
      console.error('Error al obtener las alergias:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchAlergias();
  }, [fetchAlergias]);

  // Función para agregar una nueva alergia
  const handleAdd = async () => {
    if (nuevaAlergia.trim() === '') return;
    try {
      await axios.post(`/api/users/${userId}/alergias`, { nombre: nuevaAlergia });
      setNuevaAlergia('');  // Limpia el campo
      fetchAlergias();  // Actualiza la lista
    } catch (err) {
      console.error('Error al agregar la alergia:', err);
    }
  };

  // Función para eliminar una alergia
  const handleDelete = async (alergiasId: number) => {
    try {
      await axios.delete(`/api/users/${userId}/alergias/${alergiasId}`);
      fetchAlergias();  // Actualiza la lista
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
