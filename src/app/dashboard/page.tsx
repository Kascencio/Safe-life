// src/app/dashboard/page.tsx
"use client";

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
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      try {
        const decoded: DecodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, [router]);

  return <h1>¡Bienvenido a tu Dashboard!</h1>;
}
