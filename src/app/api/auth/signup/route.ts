import { NextResponse } from 'next/server';
import fullUserSchema from '@/lib/validations/fullUserSchema';
import client from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<boolean>>> {
  const body = await req.json();
  try {
    const validationResponse = fullUserSchema.parse(body);
    const { lastname, name, password, username } = validationResponse;

    const usernameAlreadyExists = await client.user.findUnique({
      where: {
        username,
      },
    });

    if (usernameAlreadyExists) {
      return NextResponse.json(
        {
          data: [false],
          error: ['This username is already taken.'],
          result: 'error',
        },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    await client.user.create({
      data: {
        lastname,
        name,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json({ data: [true], error: [], result: 'ok' });
  } catch (err) {
    console.log('Error on signup', err);
    return NextResponse.json({
      data: [false],
      error: ['Error on signup, try again later.'],
      result: 'error',
    });
  }
}
