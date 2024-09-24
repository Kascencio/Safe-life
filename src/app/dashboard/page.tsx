// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import Perfil from './Perfil';
import Alergias from './Alergias';
import Contactos from './Contactos';
import GenerarQR from './GenerarQR';
import styles from './dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface DecodedToken {
  id: number;
  email: string;
  exp: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('perfil');
  const [userId, setUserId] = useState<number | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false); // Nuevo estado para controlar el menú

  useEffect(() => {
    // Verificar el token y extraer el userId
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      try {
        const decoded: DecodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // El token ha expirado
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          setUserId(decoded.id);
        }
      } catch {
        // El token es inválido
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, [router]);

  const renderSection = () => {
    switch (currentSection) {
      case 'perfil':
        return <Perfil userId={userId!} />;
      case 'alergias':
        return <Alergias userId={userId!} />;
      case 'contactos':
        return <Contactos userId={userId!} />;
      case 'generarQR':
        return <GenerarQR userId={userId!} />;
      default:
        return <Perfil userId={userId!} />;
    }
  };

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className={styles.dashboard}>
      <button className={styles.menuButton} onClick={handleNavToggle} aria-label="Toggle navigation menu">
      <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className={`${styles.nav} ${isNavOpen ? styles.navOpen : ''}`}>
        <button onClick={() => { setCurrentSection('perfil'); setIsNavOpen(false); }}>Perfil</button>
        <button onClick={() => { setCurrentSection('alergias'); setIsNavOpen(false); }}>Alergias</button>
        <button onClick={() => { setCurrentSection('contactos'); setIsNavOpen(false); }}>Contactos de Emergencia</button>
        <button onClick={() => { setCurrentSection('generarQR'); setIsNavOpen(false); }}>Generar QR</button>
      </nav>
      <div className={styles.content}>
        {userId ? renderSection() : <p>Cargando...</p>}
      </div>
    </div>
  );
}
