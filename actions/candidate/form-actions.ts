// not being used
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// TODO
// keep showing the error when revalidatePath

// Cause: RequestContentLengthMismatchError: Request body length does not match content-length header
//     at write (node:internal/deps/undici/undici:10059:41)
//     at _resume (node:internal/deps/undici/undici:10037:33)
//     at resume (node:internal/deps/undici/undici:9938:7)
//     at connect (node:internal/deps/undici/undici:9927:7) {
//   code: 'UND_ERR_REQ_CONTENT_LENGTH_MISMATCH'
// }
export async function updateProfile(formData: FormData) {
  console.log(formData);
  let values: any = {};
  console.log(values);
  Object.entries(Object.fromEntries(formData)).forEach(([key, value]) => {
    values[key] = JSON.parse(value as string);
  });
  console.log(values);
  let updateUser = {};

  const {
    userId,
    workExperiences,
    videoResumes,
    educations,
    fullName,
    ...rest
  } = values;

  try {
    updateUser = await prisma.user.update({
      where: {
        id: userId as string,
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

    console.log(updateUser);
    revalidatePath('/candidate/[username]', 'layout');
    return updateUser;
  } catch (error) {
    console.log(error);
  }
}
