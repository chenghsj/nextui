import React from 'react';
import { headers } from 'next/headers';
import { Candidate } from '@/components/candidate/candidate';
import getURL from '@/utils/get-url';
import { UserWithProfile } from '@/lib/types';
import { ModalDisclosureProvider } from '@/providers/modal-disclosure-provider';

type Props = {};

async function fetchData<T>(): Promise<T> {
  const res = await fetch(getURL('/api/candidate'), {
    cache: 'no-cache',
    // handle getServerSession return null error
    headers: new Headers(headers()),
  });
  return res.json() as Promise<T>;
}

export default async function CandidatePage({}: Props) {
  const candidate = await fetchData<UserWithProfile>();
  console.log({ candidate });

  return (
    <>
      <ModalDisclosureProvider>
        <Candidate candidate={candidate} />
        {/* <Button onPress={onOpen}>Editor</Button>
      <EditorModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
      </ModalDisclosureProvider>
    </>
  );
}
