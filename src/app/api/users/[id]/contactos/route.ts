// src/app/api/users/[id]/contactos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);

  try {
    const contactos = await prisma.contacto.findMany({
      where: { userId },
    });

    return NextResponse.json(contactos);
  } catch (err) {
    console.error('Error al obtener los contactos:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  const data = await request.json();

  try {
    const nuevoContacto = await prisma.contacto.create({
      data: {
        nombre: data.nombre,
        telefono: data.telefono,
        userId,
      },
    });

    return NextResponse.json(nuevoContacto);
  } catch (err) {
    console.error('Error al crear el contacto:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
