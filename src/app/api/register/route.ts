// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../utils/prisma';


export async function POST(request: Request) {
  const { fullName, email, password, phoneNumber, age } = await request.json();

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        age: Number(age),
      },
    });

    return NextResponse.json({ id: user.id, message: 'Usuario registrado exitosamente' });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: 'El registro falló' }, { status: 500 });
  }
  
}
