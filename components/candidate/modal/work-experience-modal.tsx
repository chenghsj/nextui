'use client';

import React from 'react';
import { ModalBody, Checkbox, SelectItem } from '@nextui-org/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import cn from '@/utils/cn';
import ModalApplyButtons from './modal-apply-buttons';
import TagsInput from './tags-input';
import { InputField, input_field_style } from '@/components/form/input-field';
import { WorkExperience } from '@prisma/client';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';
import ErrorMessage from '@/components/error-message';
import {
  SelectField,
  select_field_style,
} from '@/components/form/select-field';
import {
  TextareaField,
  textarea_field_style,
} from '@/components/form/textarea-field';
import { checkbox_field_style } from '@/components/form/checkbox-field';

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
          <InputField
            label='Company'
            value={watch('company')}
            {...register('company')}
            errorMessage={
              <ErrorMessage>{errors.company?.message}</ErrorMessage>
            }
            classNames={{
              ...input_field_style,
              base: 'mb-8 md:mb-auto',
            }}
          />
          <div
            className={cn(
              'grid h-20 md:h-24 md:grid-cols-2 md:items-end md:gap-5',
              'mb-14 grid-cols-1 gap-y-14 md:mb-auto'
            )}
          >
            <InputField
              label='Professional Title'
              value={watch('position')}
              {...register('position')}
              errorMessage={
                <ErrorMessage>{errors.position?.message}</ErrorMessage>
              }
              classNames={input_field_style}
            />
            <SelectField
              label='Work Type'
              defaultSelectedKeys={[watch('workType') || 'Full-time']}
              {...register('workType')}
              errorMessage={
                <ErrorMessage>{errors.workType?.message}</ErrorMessage>
              }
              classNames={select_field_style}
            >
              {Object.entries(WorkTypeEnum).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectField>
          </div>
          <div>
            <TextareaField
              label='Explanation'
              value={watch('desc') || ''}
              classNames={textarea_field_style}
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
                    classNames={checkbox_field_style}
                  >
                    Current Position
                  </Checkbox>
                );
              }}
            />
          </div>
          <div className='grid h-20 grid-cols-2 items-end gap-5 md:h-24'>
            <InputField
              label='Start Date'
              type='date'
              value={watch('startDate')?.toString().substring(0, 10)}
              {...register('startDate')}
              errorMessage={
                <ErrorMessage>{errors.startDate?.message}</ErrorMessage>
              }
              classNames={input_field_style}
            />
            <InputField
              label='End Date'
              type='date'
              isDisabled={watch('currentJob')}
              value={watch('endDate')?.toString().substring(0, 10)}
              min={watch('startDate')?.toString().substring(0, 10)}
              {...register('endDate')}
              errorMessage={
                <ErrorMessage>{errors.endDate?.message}</ErrorMessage>
              }
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

export default WorkExperienceModal;
