import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// handle { digest: 'DYNAMIC_SERVER_USAGE' } error
export const dynamic = 'force-dynamic';

export async function GET(req: NextResponse, res: NextResponse) {
  // const session = await getServerSession(authOptions);
  const params = new URL(req.url).searchParams;
  const email = params.get('email');
  const name = params.get('name');

  try {
    const user = await prisma.user.upsert({
      where: {
        // id: session!.user.id,
        email: email!,
      },
      create: {},
      update: {
        profile: {
          upsert: {
            create: {
              fullName: name,
              firstName: name?.split(' ')[0],
              lastName: name?.split(' ').splice(1).join(' '),
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
