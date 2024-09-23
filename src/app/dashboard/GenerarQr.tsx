// src/app/dashboard/GenerarQR.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code'; // Importa desde 'react-qr-code'
import styles from './generarqr.module.css';

interface GenerarQRProps {
  userId: number;
}

export default function GenerarQR({ userId }: GenerarQRProps) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/emergencia`);
        setUserData(response.data);
      } catch (err) {
        console.error('Error al obtener la información:', err);
      }
    };

    fetchData();
  }, [userId]);

  if (!userData) {
    return <p>Cargando información...</p>;
  }

  const qrUrl = `https://safe-life.vercel.app/emergencia?userId=${userId}`;

  return (
    <div className={styles.generarqr}>
      <h2>Generar Código QR</h2>
      <QRCode value={qrUrl} size={256} />
      <p>Escanea este código QR para acceder a tu información de emergencia.</p>
    </div>
  );
}
