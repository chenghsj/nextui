'use client';

import { FC, ReactNode, createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { UserWithProfile } from '@/lib/types';
import { ModalTypeEnum } from '@/components/candidate/candidate';

export enum ModalModeEnum {
  Add = 'Add',
  Edit = 'Edit',
}

type ModalContentContextType = {
  formInitialValues: {};
  candidate: UserWithProfile;
  mode: `${ModalModeEnum}`;
  modalType: `${ModalTypeEnum}`;
} & Partial<UseFormReturn>;

export const ModalContentContext =
  createContext<ModalContentContextType | null>(null);

export const useModalContentContext = () => {
  const context = useContext(ModalContentContext);

  if (!context) {
    throw new Error(
      'ModalContent.*  component must be rendered as child of ModalContent component.'
    );
  }

  return context;
};

export const ModalContentProvider: FC<
  { children: ReactNode; } & ModalContentContextType
> = ({ children, mode, modalType, formInitialValues, candidate }) => {

  return (
    <ModalContentContext.Provider
      value={{ formInitialValues, mode, modalType, candidate }}
    >
      {children}
    </ModalContentContext.Provider>
  );
};

// type ModalState = {
//   modalType: `${ModalTypeEnum}`;
//   mode: `${ModalModeEnum}`;
//   workExp?: WorkExpType;
//   education?: EducationType;
// };

// type ModalAction = {
//   updateModalType: (modalType: ModalState['modalType']) => void;
//   updateMode: (mode: ModalState['mode']) => void;
//   updateWorkExp: (workExp: ModalState['workExp']) => void;
//   updateEducation: (education: ModalState['education']) => void;
// };

// const useModalStore = create<ModalState & ModalAction>((set) => ({
//   modalType: ModalTypeEnum.Profile,
//   mode: ModalModeEnum.Add,
//   workExp: undefined,
//   education: undefined,
//   updateModalType: (modalType) => set(() => ({ modalType })),
//   updateMode: (mode) => set(() => ({ mode })),
//   updateWorkExp: (workExp) => set(() => ({ workExp })),
//   updateEducation: (education) => set(() => ({ education })),
// }));
