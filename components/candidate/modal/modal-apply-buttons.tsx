'use client';

import React, { FC, useEffect } from 'react';
import fp from 'lodash/fp';
import { useRouter } from 'next/navigation';
import { PressEvent } from '@react-types/shared';
import { ModalFooter } from '@nextui-org/react';
import { SubmitHandler, useFormContext, FieldValues } from 'react-hook-form';

import { TagButton } from '@/components/custom-button';
import cn from '@/utils/cn';
import getURL from '@/utils/get-url';
import { useModalDisclosureContext } from '@/providers/modal-disclosure-provider';
import { useFormIsSubmittingStore } from '@/hooks/form/use-form-is-submitting-store';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';

type ModalApplyButtonsProps = {
  handleSubmitFile?: () => Promise<void>;
  handleDeleteFile?: () => Promise<void>;
  doNotShowDelete?: boolean;
};

const ModalApplyButtons: FC<ModalApplyButtonsProps> = ({
  handleSubmitFile,
  handleDeleteFile,
  doNotShowDelete,
}) => {
  const methods = useFormContext();
  const router = useRouter();
  const { setIsSubmitting } = useFormIsSubmittingStore();

  const {
    getValues,
    handleSubmit,
    trigger,
    formState: { errors, dirtyFields, isSubmitting },
  } = methods;

  useEffect(() => {
    setIsSubmitting(isSubmitting);
  }, [isSubmitting]);

  const { onClose } = useModalDisclosureContext();
  const {
    modalMode,
    modalType,
    candidate: { profile },
  } = useCandidateModalStore();

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    try {
      let values: any = {};
      if (modalType === 'profile') {
        values = { ...fp.omit(['tag'], getValues()), userId: profile?.userId };
      } else {
        values = {
          ...fp.omit(['tag'], getValues()),
          userId: profile?.userId,
          userProfileId: profile?.id,
        };
      }
      console.log(values);

      await fetch(getURL(`/api/candidate/${modalType}`), {
        method: modalMode === 'Edit' ? 'PUT' : 'POST',
        body: JSON.stringify(values),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async () => {
    const values = { ...getValues(), userProfileId: profile?.id };

    await fetch(getURL(`/api/candidate/${modalType}`), {
      method: 'DELETE',
      body: JSON.stringify(values),
    });
  };

  const handleApplyClicked = async (e: PressEvent) => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }

    if (Object.keys(dirtyFields).length === 0) {
      onClose();
      return;
    }

    await handleSubmit(handleSubmitFile || onSubmit)();
    onClose();
    router.refresh();
  };

  const handleDeleteClicked = async (e: PressEvent) => {
    await handleSubmit(handleDeleteFile || onDelete)();
    onClose();
    router.refresh();
  };

  return (
    <ModalFooter
      className={cn(
        'sm:h-[15%] sm:px-5 md:px-10 md:py-7',
        'justify-between sm:flex sm:items-center',
        {
          'sm:justify-end': modalMode === 'Add' || modalType === 'profile',
        }
      )}
    >
      {doNotShowDelete || modalMode === 'Add' || (
        <div className='hidden sm:block'>
          <TagButton
            className='rounded-md border-record bg-transparent !px-10 text-record sm:px-10'
            onPress={handleDeleteClicked}
          >
            Delete
          </TagButton>
        </div>
      )}
      <div className='grid w-full grid-cols-2 sm:w-auto'>
        <TagButton
          className='rounded-md border-brand bg-transparent !px-10 text-brand dark:text-white'
          onPress={onClose}
        >
          Cancel
        </TagButton>
        <TagButton
          className='ml-3 rounded-md bg-brand !px-10 sm:px-10'
          isDisabled={Object.keys(errors).length > 0}
          onPress={handleApplyClicked}
        >
          Apply
        </TagButton>
        {doNotShowDelete || modalMode === 'Add' || (
          <div className='col-span-2 mt-3 block w-full sm:hidden'>
            <TagButton
              className='w-full rounded-md border-record bg-transparent !px-10 text-record dark:bg-record sm:px-10'
              onPress={handleDeleteClicked}
            >
              Delete
            </TagButton>
          </div>
        )}
      </div>
    </ModalFooter>
  );
};

export default ModalApplyButtons;
