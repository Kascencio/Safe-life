'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Bienvenida.module.css';// Asegúrate de que la imagen esté en tu carpeta "public" o la ruta correcta

export default function Bienvenida() {
  return (
    <div className={styles.welcome_container}>
      <div className={styles.container_image}>
        <Image src="/img/Fondo.jpg" alt="Fondo" className={styles.img} width={500} height={300}/>
      </div>
      <div className={styles.container}>
        <h1>Bienvenido a Scan Life</h1>
        <p className={styles.description}>
          Tu solución rápida y segura para acceder a información médica en situaciones de emergencia.
        </p>
        <p className={styles.description}>
          Nuestra aplicación te permite crear un código QR personalizado que contiene información médica vital como alergias, contactos de emergencia, y más. En caso de accidente, cualquier persona puede escanear tu código QR y obtener acceso inmediato a los datos que pueden salvar tu vida, sin necesidad de autenticación.
        </p>
        <div className={styles.login_register}>
          <Link href="/login">
            <button>Login</button>
          </Link>
          <Link href="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
