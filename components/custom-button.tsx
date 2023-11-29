'use client';

import { Button } from '@nextui-org/button';
import { ButtonProps, extendVariants } from '@nextui-org/react';
import cn from '@/utils/cn';
import { FC } from 'react';
import { Edit } from './icons';

export const CustomButton = extendVariants(Button, {
  variants: {
    variant: {
      'bordered-brand': cn(
        'border-1 border-brand bg-white text-brand',
        'dark:text-white dark:border-white dark:bg-transparent'
      ),
    },
    color: {
      brand: 'bg-brand text-white',
    },
    defaultVariants: {
      color: 'brand',
    },
  },
});

export const TagButton: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      className={cn(
        'text-sm md:text-base',
        'rounded bg-record font-bold italic text-white dark:text-white',
        'border-4 border-gray_b dark:border-2 dark:border-white',
        'h-fit py-1 px-2  md:h-auto md:px-4',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export const EditButton: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      className={cn(
        'w-10 h-10 md:w-14 md:h-14 rounded-xl bg-record absolute right-0 z-20 mt-10 mr-10',
        'font-bold italic text-white',
        'border-4 border-gray_b dark:border-white dark:border-2',
        // '[&_svg_path]:data-[hover=true]:fill-white data-[hover=true]:border-white data-[hover]:transition-none',
        className,
      )}
      {...props}
      isIconOnly
    >
      <Edit className='dark:[&_path]:fill-white w-5 h-5 md:w-7 md:h-7' />
    </Button>);
};
