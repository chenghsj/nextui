'use client';

import React from 'react';
import { Button, useDisclosure } from '@nextui-org/react';

import EditorModal from './_components/EditorModal';

type Props = {};

export default function CandidatePage({ }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Editor</Button>
      <EditorModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
