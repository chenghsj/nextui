import { create, StateCreator } from 'zustand';

import { ModalTypeEnum } from '@/components/candidate/candidate';
import { ModalModeEnum } from '@/providers/candidate/modal-content-provider';
import { Education, WorkExperience } from '@prisma/client';
import { UserWithProfile } from '@/lib/types';

export type CandidateSlice = {
  candidate: UserWithProfile;
  setCandidate: (candidate: UserWithProfile) => void;
};

export const createCandidateSlice: StateCreator<
  CandidateSlice,
  [],
  [],
  CandidateSlice
> = (set) => ({
  candidate: {} as UserWithProfile,
  setCandidate: (candidate) => set((state) => ({ candidate })),
});

export type ModalModeSlice = {
  modalMode: `${ModalModeEnum}`;
  setModalMode: (modalMode: `${ModalModeEnum}`) => void;
};

export const createModalModeSlice: StateCreator<
  ModalModeSlice,
  [],
  [],
  ModalModeSlice
> = (set) => ({
  modalMode: 'Add',
  setModalMode: (modalMode) => set((state) => ({ modalMode })),
});

export type ModalTypeSlice = {
  modalType: `${ModalTypeEnum}`;
  setModalType: (modalType: `${ModalTypeEnum}`) => void;
};
export const createModalTypeSlice: StateCreator<
  ModalTypeSlice,
  [],
  [],
  ModalTypeSlice
> = (set) => ({
  modalType: 'profile',
  setModalType: (modalType) => set((state) => ({ modalType })),
});

export type WorkExperienceSlice = {
  workExperience: WorkExperience;
  setWorkExperience: (workExperience: WorkExperience) => void;
};
export const createWorkExperienceSlice: StateCreator<
  WorkExperienceSlice,
  [],
  [],
  WorkExperienceSlice
> = (set) => ({
  workExperience: {} as WorkExperience,
  setWorkExperience: (workExperience) => set((state) => ({ workExperience })),
});

export type EducationSlice = {
  education: Education;
  setEducation: (workExperience: Education) => void;
};
export const createEducationSlice: StateCreator<
  EducationSlice,
  [],
  [],
  EducationSlice
> = (set) => ({
  education: {} as Education,
  setEducation: (education) => set((state) => ({ education })),
});
