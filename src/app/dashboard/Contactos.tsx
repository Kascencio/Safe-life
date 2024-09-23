// src/app/dashboard/Contactos.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './contactos.module.css';

interface ContactosProps {
  userId: number;
}

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

export default function Contactos({ userId }: ContactosProps) {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [nuevoContacto, setNuevoContacto] = useState({ nombre: '', telefono: '' });

  // Cambia 'fetchAlergias' a 'fetchContactos'
  const fetchContactos = useCallback(async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/contactos`);
      setContactos(response.data);
    } catch (err) {
      console.error('Error al obtener los contactos:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchContactos();
  }, [fetchContactos]);

  const handleAdd = async () => {
    if (nuevoContacto.nombre.trim() === '' || nuevoContacto.telefono.trim() === '') return;
    try {
      await axios.post(`/api/users/${userId}/contactos`, nuevoContacto);
      setNuevoContacto({ nombre: '', telefono: '' });
      fetchContactos();
    } catch (err) {
      console.error('Error al agregar el contacto:', err);
    }
  };

  const handleDelete = async (contactoId: number) => {
    try {
      await axios.delete(`/api/users/${userId}/contactos/${contactoId}`);
      fetchContactos();
    } catch (err) {
      console.error('Error al eliminar el contacto:', err);
    }
  };

  return (
    <div className={styles.contactos}>
      <h2>Contactos de Emergencia</h2>
      <div className={styles.containerall}>
      <ul>
        {contactos.map((contacto) => (
          <li key={contacto.id}>
            {contacto.nombre} - {contacto.telefono}
            <button onClick={() => handleDelete(contacto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={nuevoContacto.nombre}
        onChange={(e) => setNuevoContacto({ ...nuevoContacto, nombre: e.target.value })}
        placeholder="Nombre"
      />
      <input
        type="text"
        value={nuevoContacto.telefono}
        onChange={(e) => setNuevoContacto({ ...nuevoContacto, telefono: e.target.value })}
        placeholder="Teléfono"
      />
      <button className={styles.addButton} onClick={handleAdd}>Agregar Contacto</button>
    </div>
    </div>
  );
}
