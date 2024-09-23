// src/app/api/users/[id]/contactos/[contactoId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../utils/prisma';

export async function DELETE(request: NextRequest, { params }: { params: { id: string; contactoId: string } }) {
  const contactoId = parseInt(params.contactoId);

  try {
    await prisma.contacto.delete({
      where: { id: contactoId },
    });

    return NextResponse.json({ message: 'Contacto eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el contacto:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
