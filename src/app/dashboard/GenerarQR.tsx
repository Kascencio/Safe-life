// src/app/dashboard/GenerarQR.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code'; // O 'qrcode.react' si usas esa librería
import styles from './generarqr.module.css';

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

interface GenerarQRProps {
  userId: number;
}

export default function GenerarQR({ userId }: GenerarQRProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/emergencia`);
        setUserData(response.data as UserData);
      } catch (err) {
        console.error('Error al obtener la información:', err);
      }
    };

    fetchData();
  }, [userId]);

  if (!userData) {
    return <p>Cargando información...</p>;
  }

  const qrUrl = `${window.location.origin}/emergencia?userId=${userId}`;

  return (
    <div className={styles.generarqr}>
      <h2>Generar Código QR</h2>
      <div className={styles.qrCodeContainer}>
        <QRCode value={qrUrl} size={256} />
      </div>
      <p>Escanea este código QR para acceder a tu información de emergencia.</p>
    </div>
  );
}
