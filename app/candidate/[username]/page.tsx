import React from 'react';
import { Candidate } from '@/components/candidate/candidate';
import getURL from '@/utils/get-url';
import { UserWithProfile } from '@/lib/types';
import { ModalDisclosureProvider } from '@/providers/modal-disclosure-provider';
import { getServerSession } from 'next-auth';

type Props = {};

export async function getCandidate<T>(query: string): Promise<T> {
  const res = await fetch(getURL('/api/candidate' + query), {
    cache: 'no-cache',
  });
  return res.json() as Promise<T>;
}

export default async function CandidatePage({ }: Props) {
  const session = await getServerSession();
  if (!session) return;

  const query = `?email=${session.user.email}&name=${session.user.name}`;
  const candidate = await getCandidate<UserWithProfile>(query!);
  console.log({ candidate });

  return (
    <>
      <ModalDisclosureProvider>
        <Candidate candidate={candidate} />
      </ModalDisclosureProvider>
    </>
  );
}
