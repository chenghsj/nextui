import { screen, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { UserWithProfile } from '@/lib/types';

import { useModalDisclosureContext } from '@/providers/modal-disclosure-provider';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';
import { useFormIsSubmittingStore } from '@/hooks/form/use-form-is-submitting-store';

import { Candidate } from '../candidate';

export const mockedCandidateData: UserWithProfile = {
  id: '1',
  name: 'John Doe',
  image: 'https://example.com/image.jpg',
  username: 'johndoe',
  email: 'johndoe@example.com',
  emailVerified: new Date(),
  role: 'user',
  createdAt: new Date(),
  profile: {
    id: '123',
    fullName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date('1990-01-01'),
    coverURL: 'https://example.com/cover.jpg',
    bio: 'I am a software engineer',
    tags: ['React', 'Node.js'],
    updatedAt: new Date(),
    userId: '456',
    workExperiences: [
      {
        id: 1,
        company: 'Example Inc.',
        companyImg: 'https://example.com/company.jpg',
        position: 'Software Engineer',
        workType: 'Full-time',
        startDate: new Date('2020-01-01')
          .toISOString()
          .substring(0, 10)
          .replaceAll('-', '/') as unknown as Date,
        currentJob: true,
        desc: 'I worked on a variety of projects',
        tags: ['React', 'Node.js'],
        order: 1,
        endDate: null,
        updatedAt: null,
        userProfileId: '123',
      },
    ],
    educations: [
      {
        id: 2,
        schoolName: 'Example University',
        schoolImg: 'https://example.com/school.jpg',
        degree: 'Bachelor of Science in Computer Science',
        startYear: new Date('2016-01-01'),
        endYear: new Date('2020-01-01'),
        desc: 'I studied computer science',
        order: 1,
        department: 'Computer Science',
        updatedAt: new Date(),
        userProfileId: '123',
      },
    ],
    videoResumes: [],
  },
};

const mockUseDisclosureReturnValue = {
  isOpen: false,
  onOpen: jest.fn(),
  onClose: jest.fn(),
  onOpenChange: jest.fn(),
  isControlled: false,
  getButtonProps: jest.fn(),
  getDisclosureProps: jest.fn(),
};

jest.mock('@/hooks/candidate/use-candidate-modal-store');
const mockUseCandidateModalStore =
  useCandidateModalStore as jest.MockedFunction<typeof useCandidateModalStore>;

jest.mock('@/providers/modal-disclosure-provider.tsx');
const mockUseModalDisclosureContext =
  useModalDisclosureContext as jest.MockedFunction<
    typeof useModalDisclosureContext
  >;

jest.mock('@/hooks/form/use-form-is-submitting-store');
const mockUseFormIsSubmittingStore =
  useFormIsSubmittingStore as jest.MockedFunction<
    typeof useFormIsSubmittingStore
  >;

// Error: Uncaught [Error: invariant expected app router to be mounted]
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

export const candidateTestBeforeEach = () => {
  mockUseModalDisclosureContext.mockReturnValue(mockUseDisclosureReturnValue);
  mockUseCandidateModalStore.mockReturnValue({
    setCandidate: jest.fn(),
    setModalType: jest.fn(),
    setModalMode: jest.fn(),
    setWorkExperience: jest.fn(),
    setEducation: jest.fn(),
  });
  mockUseFormIsSubmittingStore.mockReturnValue({
    isSubmitting: false,
  });
  render(<Candidate candidate={mockedCandidateData} />);
};

describe('Candidate content', () => {
  beforeEach(candidateTestBeforeEach);

  afterAll(() => jest.restoreAllMocks());

  it('should render cover section', () => {});

  it('should render work experience section', async () => {
    const workExperienceSection = screen.getByRole('region', {
      name: /work experience/i,
    });
    const workExperienceAddBtn = screen.getByRole('button', {
      name: /add work experience/i,
    });
    const workExperienceEditBtn = screen.getByRole('button', {
      name: /edit work experience/i,
    });

    expect(workExperienceSection).toHaveTextContent('Work Experience');
    expect(workExperienceSection).toHaveTextContent(
      'I worked on a variety of projects'
    );
    expect(workExperienceSection).toHaveTextContent(
      'Software Engineer | Full-time'
    );
    expect(workExperienceSection).toHaveTextContent('2020/01/01 - Now');
    expect(workExperienceSection).toHaveTextContent(
      'I worked on a variety of projects'
    );
    expect(workExperienceAddBtn).toBeTruthy();
    expect(workExperienceEditBtn).toBeTruthy();
  });
});

describe('Candidate show modal', () => {
  const user = userEvent.setup();

  beforeEach(candidateTestBeforeEach);

  afterEach(() => {
    const { onOpen } = mockUseModalDisclosureContext();
    const { setModalType, setModalMode } = mockUseCandidateModalStore();

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(setModalType).toHaveBeenCalledTimes(1);
    expect(setModalMode).toHaveBeenCalledTimes(1);

    jest.resetAllMocks();
  });

  it('should show edit cover modal', async () => {
    const coverEditButton = screen.getByRole('button', { name: /edit cover/i });
    await user.click(coverEditButton);
  });

  it('should show edit profile modal', async () => {
    const profileEditButton = screen.getByRole('button', {
      name: /edit profile/i,
    });
    await user.click(profileEditButton);
  });

  it('should show edit work experience modal', async () => {
    const workExperienceEditButton = screen.getByRole('button', {
      name: /edit work experience/i,
    });
    await user.click(workExperienceEditButton);

    const { setWorkExperience } = mockUseCandidateModalStore();
    expect(setWorkExperience).toHaveBeenCalledTimes(1);
  });

  it('should show add work experience modal', async () => {
    const workExperienceAddButton = screen.getByRole('button', {
      name: /add work experience/i,
    });
    await user.click(workExperienceAddButton);

    const { setWorkExperience } = mockUseCandidateModalStore();
    expect(setWorkExperience).toHaveBeenCalledTimes(1);
  });
});
