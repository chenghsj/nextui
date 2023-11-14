import { NextApiHandler } from 'next';
import { NextResponse } from 'next/server';

import db from '../db';

export async function GET(req: Request) {
  const { home } = db;
  return NextResponse.json(home, { status: 200 });
}
