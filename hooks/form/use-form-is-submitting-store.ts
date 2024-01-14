import { create } from 'zustand';

type isSubmittingState = {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

export const useFormIsSubmittingStore = create<isSubmittingState>((set) => ({
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => set((state) => ({ isSubmitting })),
}));
