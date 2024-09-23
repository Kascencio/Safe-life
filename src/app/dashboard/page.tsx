// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';





interface DecodedToken {
  id: number;
  email: string;
  exp: number;
}

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Verificar el token y validarlo
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      try {
        const decoded = jwt_decode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // El token ha expirado
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (err) {
        // El token es inválido
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, [router]);

  return <h1>¡Bienvenido a tu Dashboard!</h1>;
}
