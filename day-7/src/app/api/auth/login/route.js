import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findUserByCredentials } from '../../../lib/users';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt:', { email, password });
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Mail and password are required' },
        { status: 400 }
      );
    }

    const user = await findUserByCredentials(email, password);
    console.log('Found user:', user);
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}