import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { WorkExperienceWithUserId } from '@/lib/types';

export async function PUT(req: Request, res: Response) {
  const body: WorkExperienceWithUserId = await req.json();

  const { userId, userProfileId, id, startDate, endDate, ...rest } = body;

  try {
    const updatedWorkExp = await prisma.workExperience.update({
      where: {
        userProfileId,
        id,
      },
      data: {
        startDate: new Date(startDate).toISOString(),
        endDate: endDate ? new Date(endDate).toISOString() : null,
        ...rest,
      },
    });
    return NextResponse.json(updatedWorkExp, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: Request, res: Response) {
  const body: WorkExperienceWithUserId = await req.json();

  const { userId, userProfileId, startDate, endDate, ...rest } = body;

  try {
    const updatedProfile = await prisma.userProfile.update({
      where: {
        id: userProfileId,
      },
      data: {
        workExperiences: {
          create: {
            startDate: new Date(startDate).toISOString(),
            endDate: endDate ? new Date(endDate).toISOString() : null,
            ...rest,
          },
        },
      },
      include: {
        workExperiences: true,
      },
    });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: Request, res: Response) {
  const body: WorkExperienceWithUserId = await req.json();
  const { userProfileId, id } = body;

  try {
    const deletedItem = await prisma.workExperience.delete({
      where: {
        userProfileId,
        id,
      },
    });
    return NextResponse.json(deletedItem, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
