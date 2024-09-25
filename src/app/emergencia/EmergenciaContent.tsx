// src/app/emergencia/EmergenciaContent.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import styles from './emergencia.module.css';

interface Alergia {
  id: number;
  nombre: string;
}

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

interface UserData {
  fullName: string;
  phoneNumber: string;
  alergias: Alergia[];
  contactos: Contacto[];
}

export default function EmergenciaContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const userId = searchParams.get('userId');
    if (userId) {
      fetchData(parseInt(userId, 10));
    }
  }, [searchParams]);

  const fetchData = async (userId: number) => {
    try {
      const response = await axios.get(`/api/users/${userId}/emergencia`);
      setData(response.data);
    } catch (err) {
      console.error('Error al obtener la información de emergencia:', err);
    }
  };

  if (!data) {
    return <p>Cargando información de emergencia...</p>;
  }

  return (
    <div className={styles.container_emergencia}>
      <div className={styles.containerall}>
        <h1 className={styles.emergencia}>Información de Emergencia</h1>
        <p><strong>Nombre:</strong> {data.fullName}</p>
        <p><strong>Teléfono:</strong> {data.phoneNumber}</p>
    
        <h2 className={styles.emergencia}>Alergias</h2>
        <ul>
          {data.alergias.map((alergia) => (
            <li key={alergia.id} className={styles.emergencia}>
              {alergia.nombre}
            </li>
          ))}
        </ul>
    
        <h2 className={styles.emergencia}>Contactos de Emergencia</h2>
        <ul>
          {data.contactos.map((contacto) => (
            <li key={contacto.id} className={styles.emergencia}>
              {contacto.nombre} - {contacto.telefono}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );  
}
