'use client';

import { FC, ReactNode, createContext, useContext } from 'react';

import { useDisclosure } from '@nextui-org/react';

type ModalDisclosureType = ReturnType<typeof useDisclosure>;

export const ModalDisclosureContext =
  createContext<ModalDisclosureType | null>(null);

export const useModalDisclosureContext = () => {
  const context = useContext(ModalDisclosureContext);

  if (!context) {
    throw new Error(
      'Modal useDisclosure.*  component must be rendered as child of Modal component.'
    );
  }

  return context;
};

export const ModalDisclosureProvider: FC<
  { children: ReactNode; }
> = ({ children }) => {
  const disclosure = useDisclosure();

  return (
    <ModalDisclosureContext.Provider value={disclosure}>
      {children}
    </ModalDisclosureContext.Provider>
  );
};