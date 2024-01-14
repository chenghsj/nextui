'use client';

import React from 'react';
import { ModalBody, Textarea, Input, Checkbox } from '@nextui-org/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';

import cn from '@/utils/cn';
import ModalApplyButtons from './modal-apply-buttons';
import TagsInput from './tags-input';
import { input_style } from './profile-modal';
import { WorkExperience } from '@prisma/client';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';

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
              ...input_style,
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
                ...input_style,
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
              classNames={input_style}
            />
          </div>
          <div>
            <Textarea
              label='Explanation'
              labelPlacement='outside'
              value={watch('desc') || ''}
              classNames={{
                label: cn(input_style.label, 'pb-2'),
                inputWrapper: cn(input_style.inputWrapper, '!h-[160px]'),
                input: cn(input_style.input, 'max-h-[135px]'),
              }}
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
                  classNames={{
                    base: '',
                    icon: 'text-black dark:text-white w-5 h-5',
                    wrapper: cn(
                      'border-gray_b border-4 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl',
                      'dark:border-white dark:border-2',
                      '[&:before]:border-none [&:after]:bg-record [&:after]:rounded-none'
                    ),
                    label: cn(input_style.label, 'group'),
                  }}
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
                ...input_style,
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
              classNames={input_style}
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
