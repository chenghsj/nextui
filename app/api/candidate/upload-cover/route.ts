import {
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommand,
  DeleteObjectCommand,
  S3Client,
  DeleteObjectCommandInput,
} from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

const s3 = new S3Client({
  region: process.env.APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.APP_AWS_ACCESS_KEY ?? '',
    secretAccessKey: process.env.APP_AWS_SECRET_KEY ?? '',
  },
});

async function uploadFileToS3(file: Buffer, fileName: string, userId: string) {
  const fileBuffer = file;
  const timestamp = Date.now();

  const userProfileFind = await prisma.userProfile.findFirst({
    where: {
      userId,
    },
  });

  if (userProfileFind?.coverURL) {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: '~' + userProfileFind?.coverURL.split('~')[1],
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3.send(deleteCommand);
  }

  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `~${userId}/profile-cover_${timestamp}`,
    Body: fileBuffer,
    ContentType: 'image',
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const userProfile = await prisma.userProfile.update({
    where: {
      userId,
    },
    data: {
      coverURL: `https://title-video-resume-upload-test.s3.ap-northeast-1.amazonaws.com/~${userId}/profile-cover_${timestamp}`,
    },
  });

  return { fileName, userProfile };
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name, userId);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const userId = formData.get('userId') as string;
  try {
    const userProfileFind = await prisma.userProfile.findFirst({
      where: {
        userId,
      },
    });

    if (userProfileFind?.coverURL) {
      const deleteParams: DeleteObjectCommandInput = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: '~' + userProfileFind?.coverURL.split('~')[1],
      };
      const deleteCommand = new DeleteObjectCommand(deleteParams);
      await s3.send(deleteCommand);
    } else {
      return NextResponse.json({
        success: true,
        message: 'There is no cover should be deleted.',
      });
    }
    const userProfile = await prisma.userProfile.update({
      where: {
        userId,
      },
      data: {
        coverURL: '',
      },
    });

    return NextResponse.json({ success: true, userProfile });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
