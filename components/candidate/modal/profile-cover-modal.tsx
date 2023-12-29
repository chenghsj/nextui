'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, Tooltip, ModalBody } from '@nextui-org/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { PressEvent } from '@react-types/shared';

import cn from '@/utils/cn';
import ModalApplyButtons from './modal-apply-buttons';
import { useModalContentContext } from '@/providers/candidate/modal-content-provider';

type Props = {};

type FormValues = {
  title: string;
  url: string;
  file: File;
};

const ProfileCoverModal = (props: Props) => {
  const { candidate } = useModalContentContext();
  const methods = useForm<FormValues>();

  const { setValue, register, watch, control } = methods;

  const [fileUrl, setFileUrl] = useState('');
  const imgInputRef = useRef<HTMLInputElement>(null);

  const file = watch('file');

  const handleUploadCover = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setValue('file', file, { shouldDirty: true });
      setFileUrl(window.URL.createObjectURL(file));
    }
  };

  const handleUploadPress = (e: PressEvent) => {
    imgInputRef.current?.click();
  };

  const handleSubmitFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('userId', candidate.id);
    formData.append('file', file);

    try {
      const response = await fetch('/api/candidate/upload-cover', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalBody className={cn('h-[80%] overflow-auto px-5 py-0 md:px-10')}>
        <div
          className={cn(
            'h-full w-full rounded-2xl p-5',
            'border-4 border-gray_b',
            'dark:border-2 dark:border-white'
          )}
        >
          <Tooltip
            size='lg'
            delay={100}
            closeDelay={100}
            radius='full'
            content='Click to change cover'
            classNames={{
              base: !fileUrl && 'hidden',
              content: 'px-5 bg-brand text-white',
            }}
          >
            <Button
              className='h-full w-full data-[pressed=true]:transform-none'
              // disableAnimation
              onPress={handleUploadPress}
            >
              {fileUrl ? (
                <Image
                  fill
                  // layout='full'
                  objectFit='cover'
                  alt='profile cover preview'
                  src={fileUrl}
                />
              ) : (
                <p className='text-3xl font-bold'>新增相片</p>
              )}
            </Button>
          </Tooltip>
          <Controller
            control={control}
            name='file'
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  {...field}
                  className='hidden'
                  ref={imgInputRef}
                  type="file"
                  onChange={handleUploadCover}
                />
              );
            }}
          />
        </div>
      </ModalBody>
      <ModalApplyButtons handleSubmitFile={handleSubmitFile} />
    </FormProvider>
  );
};

export default ProfileCoverModal;
