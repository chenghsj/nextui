import React from 'react';
// import { Button, useDisclosure } from '@nextui-org/react';


import { Candidate } from '@/components/candidate/candidate';
import getURL from '@/utils/get-url';

// import { EditorModal } from '@/components/candidate/editor-modal';

type Props = {};

async function fetchData<T>(): Promise<T> {
  const res = await fetch(getURL('/api/db'), {
    cache: 'no-cache',
  });

  return res.json() as Promise<T>;
}

export default async function CandidatePage({ }: Props) {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fetchedData = (await fetchData()) as IDB;
  console.log(fetchedData.candidate);

  return (
    <>
      <Candidate candidate={fetchedData.candidate} />
      {/* <Button onPress={onOpen}>Editor</Button>
      <EditorModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
    </>
  );
}
