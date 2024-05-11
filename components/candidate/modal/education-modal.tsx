'use client';

import React from 'react';
import { ModalBody, Input, Checkbox } from '@nextui-org/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';

import cn from '@/utils/cn';
import ModalApplyButtons from './modal-apply-buttons';
import TagsInput from './tags-input';
import { WorkExperience } from '@prisma/client';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';
import {
  TextareaField,
  textarea_field_style,
} from '@/components/form/textarea-field';
import { input_field_style } from '@/components/form/input-field';
import { checkbox_field_style } from '@/components/form/checkbox-field';

type WorkExpTypeModalFields = WorkExperience & {
  tag: string;
};

type Props = {};

const EducationModal = (props: Props) => {
  const { modalMode, education } = useCandidateModalStore();
  const methods = useForm<WorkExpTypeModalFields>({
    mode: 'all',
    defaultValues: education,
  });

  const {
    register,
    watch,
    control,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <ModalBody
        className={cn(
          'overflow-auto px-5 py-0 md:px-10',
          modalMode === 'Add' ? 'h-[85%] sm:h-[80%]' : 'h-[80%]'
        )}
      >
        <div className='mt-10 flex flex-col gap-5'>
          <Input
            variant='bordered'
            radius='sm'
            label='Company'
            placeholder=' '
            labelPlacement='outside'
            value={watch('company')}
            {...register('company', {
              required: 'This is a required field',
            })}
            // isInvalid={!!errors.position?.message}
            errorMessage={errors.position?.message}
            classNames={{
              ...input_field_style,
              helperWrapper: 'block',
              errorMessage: 'text-base',
            }}
          />
          <div className='grid h-20 grid-cols-2 items-end gap-5 md:h-24'>
            <Input
              variant='bordered'
              radius='sm'
              label='Professional Title'
              placeholder=' '
              labelPlacement='outside'
              value={watch('position')}
              {...register('position', {
                required: {
                  value: true,
                  message: 'This is a required field',
                },
              })}
              // isInvalid={!!errors.position?.message}
              errorMessage={errors.position?.message}
              classNames={{
                ...input_field_style,
                helperWrapper: 'block',
                errorMessage: 'text-base',
              }}
            />
            <Input
              variant='bordered'
              radius='sm'
              label='Work Type'
              placeholder=' '
              labelPlacement='outside'
              value={watch('workType') || ''}
              {...register('workType')}
              errorMessage={errors.workType?.message}
              classNames={input_field_style}
            />
          </div>
          <div>
            <TextareaField
              label='Explanation'
              value={watch('desc') || ''}
              classNames={textarea_field_style}
              {...register('desc')}
            />
          </div>
          <div className='flex items-end md:py-4'>
            <Controller
              control={control}
              name='currentJob'
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  onChange={onChange}
                  defaultSelected={value}
                  disableAnimation
                  className='rounded-xl'
                  classNames={checkbox_field_style}
                >
                  Current Position
                </Checkbox>
              )}
            />
          </div>
          <div className='grid h-20 grid-cols-2 items-end gap-5 md:h-24'>
            <Input
              variant='bordered'
              radius='sm'
              label='Start Date'
              placeholder=' '
              type='date'
              labelPlacement='outside'
              value={watch('startDate')?.toString().substring(0, 10)}
              {...register('startDate', {
                required: 'This is a required field',
              })}
              // isInvalid={!!errors.position?.message}
              errorMessage={errors.position?.message}
              classNames={{
                ...input_field_style,
                helperWrapper: 'block',
                errorMessage: 'text-base',
              }}
            />
            <Input
              variant='bordered'
              radius='sm'
              label='End Date'
              placeholder=' '
              type='date'
              labelPlacement='outside'
              isDisabled={watch('currentJob')}
              value={watch('endDate')?.toString().substring(0, 10)}
              {...register('endDate')}
              errorMessage={errors.endDate?.message}
              classNames={input_field_style}
            />
          </div>
          <TagsInput />
        </div>
      </ModalBody>
      <ModalApplyButtons />
    </FormProvider>
  );
};

export default EducationModal;
