import React, { FC, useEffect, useRef, useState } from 'react';
import { KeyboardEvent, PressEvent } from '@react-types/shared';
import * as v from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from '@nextui-org/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';

import { ModalTypeEnum } from '../candidate';
import { TagButton } from '../../custom-button';
import { DefaultSession } from 'next-auth';
import cn from '@/utils/cn';
import { ArrowRight, Close } from '@/components/icons';
import ModalApplyButtons from './modal-apply-buttons';

type Props = {
  modalType: keyof typeof ModalTypeEnum;
  title?: string,
} & Pick<DefaultSession, 'user'>;

export type IProfileModalFields = {
  firstName?: string;
  lastName?: string;
  aboutMe?: string;
  tags?: string[];
};

const aboutMeFormSchema = v.object({
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  aboutMe: v.optional(v.string())
});

const input_style = {
  label: 'font-semibold italic text-xl md:text-2xl text-gray_b dark:text-white w-fit md:pb-2',
  inputWrapper: cn(
    'border-4 border-gray_b data-[hover=true]:border-gray_b',
    'dark:border-white dark:border-2',
    'bg-transparent data-[focus=true]:!bg-record data-[hover=true]:bg-record',
    'rounded-xl h-fit'
  ),
  input: 'rounded-lg italic text-base focus:text-white font-semibold focus:outline-none autofill:!bg-transparent box-border md:p-3'
};

const tag_input_style = {
  ...input_style,
  inputWrapper: cn(
    'border-4 border-gray_b data-[hover=true]:border-gray_b',
    'dark:border-white dark:border-2',
    'bg-transparent',
    'rounded-xl h-fit rounded-r-none border-r-0'
  ),
  input: 'rounded-lg italic text-base font-semibold focus:outline-none autofill:!bg-transparent box-border md:p-3'
};


const CandidateModal: FC<Props> = ({
  user,
}) => {
  const modalBodyRef = useRef<null | HTMLDivElement>(null);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');

  const methods = useForm<IProfileModalFields>({
    mode: 'onChange',
    defaultValues: {
      firstName: user?.name ?? '',
      lastName: '',
      aboutMe: '',
    },
    resolver: valibotResolver(aboutMeFormSchema),
  });

  const {
    register,
    formState: { errors }
  } = methods;

  const handleArrowClick = (e?: PressEvent) => {
    const hashedTag = `#${tag}`;

    if (tag && !tagList.includes(hashedTag) && tagList.length <= 6) {
      setTagList([...tagList, hashedTag]);
    }
    // modalBodyRef.current?.scrollIntoView({ behavior: "smooth" });
    setTag('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleArrowClick();
    }
  };

  const handleRemoveTag = (removedTag: string) => (e: any) => {
    setTagList(tagList.filter(singleTag => singleTag !== removedTag));
  };

  return (
    <FormProvider {...methods}>
      <form className='h-full'>
        <ModalHeader className='p-5 md:p-10 font-bold text-2xl md:text-3xl h-[15%]'>
          Edit Profile
        </ModalHeader>

        <ModalBody
          className='px-5 md:px-10 py-0 overflow-auto h-[70%]'>
          <div className='flex flex-col gap-5 mt-10'>
            <div className='grid grid-cols-2 gap-5'>
              <Input
                variant='bordered'
                radius='sm'
                type='email'
                label='First Name'
                placeholder=' '
                labelPlacement='outside'
                {...register('firstName')}
                errorMessage={errors.firstName?.message}
                classNames={input_style}
              />
              <Input
                variant='bordered'
                radius='sm'
                type='email'
                label='Last Name'
                placeholder=' '
                labelPlacement='outside'
                {...register('lastName')}
                errorMessage={errors.lastName?.message}
                classNames={input_style}
              />
            </div>
            <div>
              <Textarea
                label='About Me'
                labelPlacement='outside'
                classNames={{
                  label: cn(input_style.label, 'pb-2'),
                  inputWrapper: cn(input_style.inputWrapper, '!h-[160px]'),
                  input: cn(input_style.input, 'max-h-[135px]')
                }}
                {...register('aboutMe')}
              />
            </div>
            <div className='flex flex-col gap-5'>
              <div className='mt-12 flex h-16 w-full items-center'>
                <Input
                  classNames={tag_input_style}
                  label='Your Professional Hashtag'
                  labelPlacement='outside'
                  placeholder=' '
                  onKeyDown={handleKeyDown}
                  value={tag}
                  onValueChange={setTag}
                // onValueChange={(value: string) => setJoinEmail(value)}
                />
                <Button
                  size='md'
                  isIconOnly
                  className={cn(
                    'bg-record p-1 data-[pressed=true]:transform-none',
                    'rounded-l-none rounded-r-xl',
                    'md:h-[51px] md:w-[51px]',
                    'border-4 border-gray_b'
                  )}
                  startContent={<ArrowRight className='w-5 text-base' />}
                  onPress={handleArrowClick}
                />

              </div>
              <div className='flex flex-wrap gap-5'>
                {tagList.map((singleTag, index) => (
                  <TagButton
                    key={singleTag}
                    className='flex justify-between text-base'
                    endContent={
                      <Close
                        className='w-4 hover:scale-125 transition-all'
                        onClick={handleRemoveTag(singleTag)}
                      />
                    }
                    disableRipple
                    disableAnimation
                  >
                    {singleTag}
                  </TagButton>
                ))}
              </div>
            </div>
          </div>
          <div ref={modalBodyRef} />
        </ModalBody>
        <ModalApplyButtons<IProfileModalFields>
          data={{ ...methods.getValues(), tags: tagList }}
        />
      </form>
    </FormProvider>
  );
};

export default CandidateModal;