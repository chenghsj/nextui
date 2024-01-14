'use client';

import React, { FC } from 'react';
import {
  ModalBody,
  Input,
  Textarea,
  InputSlots,
  SlotsToClasses,
} from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import { UserProfile } from '@prisma/client';

import cn from '@/utils/cn';
import ModalApplyButtons from './modal-apply-buttons';
import TagsInput from './tags-input';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';

type Props = {};

export type ProfileModalFieldsType = UserProfile & {
  tag: string;
};

export const input_style: SlotsToClasses<InputSlots> = {
  label:
    'font-semibold italic text-xl md:text-2xl text-gray_b dark:text-white w-fit md:pb-2',
  inputWrapper: cn(
    'border-4 border-gray_b data-[hover=true]:border-gray_b',
    'dark:border-white dark:border-2',
    'bg-transparent data-[focus=true]:!bg-record data-[hover=true]:bg-record',
    'rounded-xl h-fit dark:inputDarkModeOverride'
  ),
  input: cn(
    'dark:inputDarkModeOverride',
    'rounded-lg italic text-base focus:text-white font-semibold focus:outline-none box-border md:p-3'
  ),
  helperWrapper: 'block',
};

export const tag_input_style: SlotsToClasses<InputSlots> = {
  ...input_style,
  inputWrapper: cn(
    'border-4 border-gray_b data-[hover=true]:border-gray_b',
    'dark:border-white dark:border-2',
    'bg-transparent',
    'rounded-xl h-fit rounded-r-none border-r-0'
  ),
  input:
    'rounded-lg italic text-base font-semibold focus:outline-none autofill:!bg-transparent box-border md:p-3',
  helperWrapper: 'block',
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
            <Input
              variant='bordered'
              radius='sm'
              type='text'
              label='First Name'
              placeholder=' '
              labelPlacement='outside'
              value={watch('firstName') || ''}
              {...register('firstName')}
              errorMessage={errors.firstName?.message}
              classNames={input_style}
            />
            <Input
              variant='bordered'
              radius='sm'
              type='text'
              label='Last Name'
              placeholder=' '
              labelPlacement='outside'
              value={watch('lastName') || ''}
              {...register('lastName')}
              errorMessage={errors.lastName?.message}
              classNames={input_style}
            />
          </div>
          <div>
            <Textarea
              label='About Me'
              labelPlacement='outside'
              value={watch('bio') || ''}
              classNames={{
                label: cn(input_style.label, 'pb-2'),
                inputWrapper: cn(input_style.inputWrapper, '!h-[160px]'),
                input: cn(input_style.input, 'max-h-[135px]'),
              }}
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
