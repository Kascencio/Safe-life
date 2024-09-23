// src/types/index.ts
export interface Alergia {
    id: number;
    nombre: string;
  }
  
  export interface Contacto {
    id: number;
    nombre: string;
    telefono: string;
  }
  
  export interface UserData {
    fullName: string;
    phoneNumber: string;
    alergias: Alergia[];
    contactos: Contacto[];
  }
  