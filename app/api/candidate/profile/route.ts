import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/types';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, res: NextApiResponse) {
  try {
    const body: UserProfile = await req.json();

    const {
      userId,
      workExperiences,
      videoResumes,
      educations,
      fullName,
      ...rest
    } = body;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile: {
          update: {
            data: {
              fullName: `${rest.firstName} ${rest.lastName}`,
              ...rest,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
