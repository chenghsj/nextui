'use client';

import React, { FC } from 'react';
import fp from 'lodash/fp';
import { useRouter } from 'next/navigation';
import { PressEvent } from '@react-types/shared';
import { ModalFooter } from '@nextui-org/react';
import { SubmitHandler, useFormContext, FieldValues } from 'react-hook-form';

import { useModalContentContext } from '@/providers/candidate/modal-content-provider';
import { TagButton } from '@/components/custom-button';
import cn from '@/utils/cn';
import getURL from '@/utils/get-url';
import { useModalDisclosureContext } from '@/providers/modal-disclosure-provider';

type ModalApplyButtonsProps = {
  handleSubmitFile?: () => Promise<void>;
  doNotShowDelete?: boolean;
};

const ModalApplyButtons: FC<ModalApplyButtonsProps> = ({
  handleSubmitFile,
  doNotShowDelete,
}) => {
  const methods = useFormContext();
  const router = useRouter();

  const {
    getValues,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = methods;
  const { onClose } = useModalDisclosureContext();
  const { mode, modalType, candidate: { profile } } = useModalContentContext();

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    try {
      let values: any = {};
      if (modalType === 'profile') {
        values = { ...fp.omit(['tag'], getValues()), userId: profile?.userId };
      } else {
        values = { ...fp.omit(['tag'], getValues()), userId: profile?.userId, userProfileId: profile?.id };
      }

      // console.log(values);
      const formData = new FormData();

      for (var key in values) {
        formData.append(key, JSON.stringify(values[key]));
      }

      await fetch(getURL(`/api/candidate/${modalType}`), {
        method: mode === 'Edit' ? 'PUT' : 'POST',
        body: JSON.stringify(values),
      });

    } catch (e) {
      console.log(e);
    }
  };

  const handleApplyClick = async (e: PressEvent) => {
    console.log({ dirtyFields, errors });
    if (Object.keys(dirtyFields).length === 0) {
      onClose();
      return;
    }

    await handleSubmit(handleSubmitFile || onSubmit)();

    onClose();
    router.refresh();
  };

  const handleDelete = async (e: PressEvent) => {
    const values = { ...getValues(), userProfileId: profile?.id };

    await fetch(getURL(`/api/candidate/${modalType}`), {
      method: 'DELETE',
      body: JSON.stringify(values),
    });

    router.refresh();
    onClose();
  };

  return (
    <ModalFooter
      className={cn(
        'py-7 sm:h-[15%] sm:px-5 md:px-10',
        'justify-between sm:flex sm:items-center',
        {
          'sm:justify-end': mode === 'Add' || modalType === 'profile',
        }
      )}
    >
      {doNotShowDelete || mode === 'Add' || (
        <div className='hidden sm:block'>
          <TagButton
            className='rounded-md border-record bg-transparent !px-10 text-record sm:px-10'
            onPress={handleDelete}
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
          className='ml-5 rounded-md bg-brand !px-10 sm:px-10'
          onPress={handleApplyClick}
        >
          Apply
        </TagButton>
        {doNotShowDelete || mode === 'Add' || (
          <div className='col-span-2 mt-3 block w-full sm:hidden'>
            <TagButton
              className='w-full rounded-md border-record bg-transparent !px-10 text-record dark:bg-record sm:px-10'
              onPress={handleDelete}
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
