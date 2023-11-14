import { NextApiHandler } from 'next';
import { NextResponse } from 'next/server';

import db from './db';

export async function GET(req: Request) {
  return NextResponse.json(db, { status: 200 });
}
