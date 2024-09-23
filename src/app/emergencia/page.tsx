// src/app/emergencia/page.tsx
'use client';

export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import EmergenciaContent from './EmergenciaContent';

export default function EmergenciaPage() {
  return (
    <Suspense fallback={<p>Cargando información de emergencia...</p>}>
      <EmergenciaContent />
    </Suspense>
  );
}