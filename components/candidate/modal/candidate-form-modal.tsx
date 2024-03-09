'use client';

import React, { ReactElement } from 'react';
import _ from 'lodash';
import { Modal, ModalContent, ModalHeader } from '@nextui-org/react';

import Loading from '@/app/loading';
import { useModalDisclosureContext } from '@/providers/modal-disclosure-provider';
import { useFormIsSubmittingStore } from '@/hooks/form/use-form-is-submitting-store';
import ProfileCoverModal from './profile-cover-modal';
import ProfileModal from './profile-modal';
import WorkExperienceModal from './work-experience-modal';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';
import { ModalTypeEnum } from '../candidate';

type Props = {};

const getRenderedModal = (modalType: `${ModalTypeEnum}`) => {
  let modal: ReactElement;

  switch (modalType) {
    case 'profile-cover':
      modal = <ProfileCoverModal />;
      break;
    case 'video-resume':
      modal = <></>;
      break;
    case 'profile':
      modal = <ProfileModal />;
      break;
    case 'work-experience':
      modal = <WorkExperienceModal />;
      break;
    case 'education':
      modal = <></>;
      break;
    default:
      modal = <></>;
      break;
  }
  return { modal };
};

function CandidateFormModal({ }: Props) {
  const { isOpen, onOpenChange } = useModalDisclosureContext();
  const { isSubmitting } = useFormIsSubmittingStore();
  const { modalType, modalMode } = useCandidateModalStore();

  const { modal } = getRenderedModal(modalType);

  return (
    <Modal
      className='h-[80%]'
      radius='sm'
      size='4xl'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      isDismissable={!isSubmitting}
    >
      <ModalContent>
        {isSubmitting && (
          <div className='absolute z-50 flex h-full w-full bg-white opacity-75 dark:bg-gray_b'>
            <Loading />
          </div>
        )}
        <ModalHeader className='h-[10%] p-5 text-2xl font-bold leading-10 sm:h-[15%] md:p-10 md:text-3xl'>
          {modalMode} {modalType?.split('-').map(word => _.upperFirst(word)).join(' ')}
        </ModalHeader>
        <form className='h-[90%] sm:h-[85%]'>{modal}</form>
      </ModalContent>
    </Modal>
  );
}

export default CandidateFormModal;
