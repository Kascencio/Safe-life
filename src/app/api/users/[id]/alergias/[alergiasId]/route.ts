import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../utils/prisma';

export async function DELETE(request: NextRequest, { params }: { params: { id: string; alergiasId: string } }) {
  const alergiasId = parseInt(params.alergiasId);  // Conversión directa, igual que en contactos

  console.log('ID de usuario:', params.id);  // Debugging
  console.log('ID de alergia:', alergiasId);  // Debugging

  if (isNaN(alergiasId)) {
    console.error('El ID de la alergia es inválido o NaN');
    return NextResponse.json({ error: 'ID de alergia inválido' }, { status: 400 });
  }

  try {
    await prisma.alergia.delete({
      where: { id: alergiasId },
    });

    return NextResponse.json({ message: 'Alergia eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar la alergia:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
