'use client';

import React from 'react';
import {
  ModalBody,
  Textarea,
  Input,
  Checkbox,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import cn from '@/utils/cn';
import ModalApplyButtons from './modal-apply-buttons';
import TagsInput from './tags-input';
import { input_style } from './profile-modal';
import { WorkExperience } from '@prisma/client';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';
import ErrorMessage from '@/components/error-message';

const workDateSchema = z
  .object({
    currentJob: z.boolean(),
    startDate: z.string().min(1, 'This is a required field.'),
    endDate: z.string(),
  })
  .refine(
    (values) => {
      if (values.currentJob) {
        return true;
      }
      return values.endDate.length > 0;
    },
    {
      message: 'Required if current position is unchecked.',
      path: ['endDate'],
    }
  );

export const workExperienceValidationSchema = z
  .object({
    company: z.string().min(1, 'This is a required field.'),
    position: z.string().min(1, 'This is a required field.'),
    desc: z.string().max(300, 'The maximum is 300 chareacters.'),
  })
  .and(workDateSchema);

enum WorkTypeEnum {
  FullTime = 'Full-time',
  PartTime = 'Part-time',
}

type WorkExpTypeModalFields = WorkExperience & {
  tag: string;
};

type Props = {};
const WorkExperienceModal = (props: Props) => {
  const { workExperience, modalMode } = useCandidateModalStore();

  const methods = useForm<WorkExpTypeModalFields>({
    mode: 'all',
    defaultValues: {
      ...workExperience,
      currentJob: workExperience.currentJob || false,
      startDate: workExperience.startDate || '',
      endDate: (workExperience.endDate as Date) || '',
    },
    resolver: zodResolver(workExperienceValidationSchema),
  });

  const {
    register,
    watch,
    control,
    clearErrors,
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
            {...register('company')}
            errorMessage={
              <ErrorMessage>{errors.company?.message}</ErrorMessage>
            }
            classNames={{
              ...input_style,
              base: 'mb-8 md:mb-auto',
            }}
          />
          <div
            className={cn(
              'grid h-20 md:h-24 md:grid-cols-2 md:items-end md:gap-5',
              'mb-14 grid-cols-1 gap-y-14 md:mb-auto'
            )}
          >
            <Input
              variant='bordered'
              radius='sm'
              label='Professional Title'
              placeholder=' '
              labelPlacement='outside'
              value={watch('position')}
              {...register('position')}
              errorMessage={
                <ErrorMessage>{errors.position?.message}</ErrorMessage>
              }
              classNames={{
                ...input_style,
              }}
            />
            <Select
              variant='bordered'
              radius='sm'
              label='Work Type'
              placeholder=' '
              labelPlacement='outside'
              defaultSelectedKeys={[watch('workType') || 'Full-time']}
              {...register('workType')}
              errorMessage={
                <ErrorMessage>{errors.workType?.message}</ErrorMessage>
              }
              classNames={{
                label: input_style.label,
                base: '-top-2',
                mainWrapper: cn(
                  input_style.inputWrapper,
                  'h-10 md:h-[51px] min-h-0'
                ),
                trigger: 'border-none min-h-0',
                value: input_style.input,
                helperWrapper: 'hidden',
              }}
            >
              {Object.entries(WorkTypeEnum).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </Select>
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
                helperWrapper: 'block',
              }}
              {...register('desc')}
              errorMessage={<ErrorMessage>{errors.desc?.message}</ErrorMessage>}
            />
          </div>
          <div className='flex items-end md:py-4'>
            <Controller
              control={control}
              name='currentJob'
              render={({ field: { onChange, value } }) => {
                return (
                  <Checkbox
                    onChange={(e) => {
                      onChange(e.target.checked);
                      if (e.target.checked) {
                        clearErrors('endDate');
                      }
                    }}
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
                );
              }}
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
              {...register('startDate')}
              errorMessage={
                <ErrorMessage>{errors.startDate?.message}</ErrorMessage>
              }
              classNames={{
                ...input_style,
                helperWrapper: 'block',
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
              min={watch('startDate')?.toString().substring(0, 10)}
              {...register('endDate')}
              errorMessage={
                <ErrorMessage>{errors.endDate?.message}</ErrorMessage>
              }
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

export default WorkExperienceModal;
