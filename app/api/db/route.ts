import { NextResponse } from 'next/server';
import db from '@/data/db';

export async function GET(req: Request) {
  return NextResponse.json(db, { status: 200 });
}
