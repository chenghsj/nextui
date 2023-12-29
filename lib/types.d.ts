import NextAuth from 'next-auth/next';
import { Prisma, WorkExperience } from '@prisma/client';
import { User } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  type JWT = User;
}

type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    profile: {
      include: {
        videoResumes: true;
        workExperiences: true;
        educations: true;
      };
    };
  };
}>;

type UserProfile = Prisma.UserProfileGetPayload<{
  include: {
    videoResumes: {
      include: true;
    };
    workExperiences: {
      include: true;
    };
    educations: {
      include: true;
    };
  };
}>;

type WorkExperienceWithUserId = WorkExperience & {
  userId: string;
};
