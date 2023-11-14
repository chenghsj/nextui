'use client';

import { Button } from '@nextui-org/button';
import { extendVariants } from '@nextui-org/react';
import cn from '@/utils/cn';

const MyButton = extendVariants(Button, {
  variants: {
    variant: {
      'bordered-brand': cn(
        'border-1 border-brand bg-white text-brand',
        'dark:text-white dark:border-white dark:bg-transparent'
      )
    },
    color: {
      brand: 'bg-brand text-white'
    },
    defaultVariants: {
      color: 'brand'
    }
  }
});

export default MyButton;
