'use client';

import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { Card, CardBody, CardHeader, Divider, Input, Button } from '@nextui-org/react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";
import * as v from 'valibot';
import CustomButton from '../custom-button';
import { Google } from '../icons';
import DividerWithText from '../divider-with-text';
import getURL from '@/utils/getURL';

interface IFormInput {
  email: string;
}

type Props = {};


const LoginFormSchema = v.object({
  email: v.optional(v.string([
    v.email('Please follow the email format.')
  ]))
});

export default function Signin({ }: Props) {
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      email: ''
    },
    resolver: valibotResolver(LoginFormSchema)
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => alert(JSON.stringify(data, null, 2));

  useEffect(() => {
    if (session) {
      redirect(`/candidate/${session.user?.name}`);
    }
  }, [session]);

  return (
    <Card
      className='p-8 w-80'
      shadow='sm'
    >
      <CardHeader
        className='p-0 font-bold text-lg'
      >
        Log in
      </CardHeader>
      <Button
        className='mt-4'
        variant='bordered'
        radius='sm'
        startContent={
          <div className='bg-gray_b p-1 rounded-full'>
            <Google width={12} fill='white' />
          </div>
        }
        onPress={() => signIn('google')}
      >
        Continue with Google
      </Button>
      <DividerWithText
        classNames={{
          divider: 'border-none'
        }}
      >
        OR
      </DividerWithText>
      <CardBody className='p-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            variant='bordered'
            radius='sm'
            type='email'
            label='Email'
            placeholder='example@gmail.com'
            labelPlacement='outside'
            {...register('email', {
              required: true,
            })}
            errorMessage={errors.email?.message}
          />
          <CustomButton
            radius='sm'
            className='mt-5'
            fullWidth
            type='submit'
            color='brand'
          >
            Log in with email
          </CustomButton>
        </form>
      </CardBody>
    </Card>
  );
}