// src/app/api/users/[id]/alergias/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);

  try {
    const alergias = await prisma.alergia.findMany({
      where: { userId },
    });

    return NextResponse.json(alergias);
  } catch (err) {
    console.error('Error al obtener las alergias:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  const data = await request.json();

  try {
    const nuevaAlergia = await prisma.alergia.create({
      data: {
        nombre: data.nombre,
        userId,
      },
    });

    return NextResponse.json(nuevaAlergia);
  } catch (err) {
    console.error('Error al crear la alergia:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
