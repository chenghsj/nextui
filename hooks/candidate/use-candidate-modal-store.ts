import { create } from 'zustand';
import {
  CandidateSlice,
  ModalModeSlice,
  ModalTypeSlice,
  WorkExperienceSlice,
  EducationSlice,
  createCandidateSlice,
  createModalModeSlice,
  createModalTypeSlice,
  createEducationSlice,
  createWorkExperienceSlice,
} from './slice';

export const useCandidateModalStore = create<
  CandidateSlice &
    ModalModeSlice &
    ModalTypeSlice &
    WorkExperienceSlice &
    EducationSlice
>()((...a) => ({
  ...createCandidateSlice(...a),
  ...createModalModeSlice(...a),
  ...createModalTypeSlice(...a),
  ...createEducationSlice(...a),
  ...createWorkExperienceSlice(...a),
}));
