'use client';

import { Button } from '@nextui-org/button';
import { ButtonProps, extendVariants } from '@nextui-org/react';
import cn from '@/utils/cn';
import { FC } from 'react';
import { Edit, Plus } from './icons';

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

export const TagButton: FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(
        'text-sm md:text-base',
        'rounded bg-record font-bold italic text-white dark:text-white',
        'border-4 border-gray_b dark:border-2 dark:border-white',
        'h-fit px-2 py-1 md:px-4',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export const EditButton: FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(
        'absolute right-0 z-20 mr-10 h-10 w-10 rounded-xl md:h-14 md:w-14',
        'font-bold italic text-white',
        'border-4 border-gray_b dark:border-2 dark:border-white',
        'bg-gray_l1 dark:bg-gray_l2',
        // '[&_svg_path]:data-[hover=true]:fill-white data-[hover=true]:border-white data-[hover]:transition-none',
        className
      )}
      {...props}
      isIconOnly
    >
      <Edit className='h-5 w-5 md:h-7 md:w-7 dark:[&_path]:fill-white' />
    </Button>
  );
};

export const AddButton: FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(
        'absolute right-0 z-20 mr-10 h-10 w-10 rounded-xl bg-record md:h-14 md:w-14',
        'font-bold italic text-white',
        'border-4 border-gray_b dark:border-2 dark:border-white',
        // '[&_svg_path]:data-[hover=true]:fill-white data-[hover=true]:border-white data-[hover]:transition-none',
        className
      )}
      {...props}
      isIconOnly
    >
      <Plus className='h-5 w-5 md:h-7 md:w-7 dark:[&_path]:fill-white' />
    </Button>
  );
};
