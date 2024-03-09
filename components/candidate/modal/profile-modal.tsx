'use client';

import React, { FC } from 'react';
import {
  ModalBody,
} from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import { UserProfile } from '@prisma/client';

import cn from '@/utils/cn';
import ModalApplyButtons from './modal-apply-buttons';
import TagsInput from './tags-input';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';
import { InputField, input_field_style } from '@/components/form/input-field';
import { TextareaField, textarea_field_style } from '@/components/form/textarea-field';

type Props = {};

export type ProfileModalFieldsType = UserProfile & {
  tag: string;
};

const CandidateModal: FC<Props> = () => {
  const { candidate } = useCandidateModalStore();

  const methods = useForm<ProfileModalFieldsType>({
    mode: 'all',
    defaultValues: candidate.profile || {},
  });

  const {
    register,
    watch,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <ModalBody className='h-[85%] overflow-auto px-5 py-0 sm:h-[80%] md:px-10'>
        <div className='mt-10 flex flex-col gap-5'>
          <div className='grid grid-cols-2 gap-5'>
            <InputField
              label='First Name'
              value={watch('firstName') || ''}
              {...register('firstName')}
              errorMessage={errors.firstName?.message}
              classNames={input_field_style}
            />
            <InputField
              label='Last Name'
              value={watch('lastName') || ''}
              {...register('lastName')}
              errorMessage={errors.lastName?.message}
              classNames={input_field_style}
            />
          </div>
          <div>
            <TextareaField
              label='About Me'
              labelPlacement='outside'
              value={watch('bio') || ''}
              classNames={textarea_field_style}
              {...register('bio')}
            />
          </div>
          <TagsInput />
        </div>
      </ModalBody>

      <ModalApplyButtons doNotShowDelete />
    </FormProvider>
  );
};

export default CandidateModal;
