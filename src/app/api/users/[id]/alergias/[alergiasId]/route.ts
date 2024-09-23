// src/app/api/users/[id]/alergias/[alergiaId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
// Correcto
import { prisma } from '../../../../../utils/prisma';


export async function DELETE(request: NextRequest, { params }: { params: { id: string; alergiaId: string } }) {
  const alergiaId = parseInt(params.alergiaId);

  try {
    await prisma.alergia.delete({
      where: { id: alergiaId },
    });

    return NextResponse.json({ message: 'Alergia eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar la alergia:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
