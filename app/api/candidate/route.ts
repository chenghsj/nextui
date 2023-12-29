import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// handle { digest: 'DYNAMIC_SERVER_USAGE' } error
export const dynamic = 'force-dynamic';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession();
  try {
    console.log(session);
    const user = await prisma.user.upsert({
      where: {
        id: session?.user.id,
        email: session?.user.email!,
      },
      create: {},
      update: {
        profile: {
          upsert: {
            create: {
              fullName: session?.user?.name,
              firstName: session?.user!.name?.split(' ')[0],
              lastName: session?.user!.name?.split(' ').splice(1).join(' '),
            },
            update: {},
          },
        },
      },
      include: {
        profile: {
          include: {
            videoResumes: {
              orderBy: {
                updatedAt: 'desc',
              },
            },
            workExperiences: {
              orderBy: {
                startDate: 'desc',
              },
            },
            educations: {
              orderBy: {
                startYear: 'desc',
              },
            },
          },
        },
      },
    });

    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
