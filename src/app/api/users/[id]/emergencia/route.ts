// src/app/api/users/[id]/emergencia/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        phoneNumber: true,
        alergias: true,
        contactos: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('Error al obtener la información de emergencia:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
