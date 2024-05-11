import cn from '@/utils/cn';
import { input_field_style } from './input-field';

export const checkbox_field_style = {
  icon: 'text-black dark:text-white w-5 h-5',
  wrapper: cn(
    'border-gray_b border-4 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl',
    'dark:border-white dark:border-2',
    '[&:before]:border-none [&:after]:bg-record [&:after]:rounded-none'
  ),
  label: cn(input_field_style.label, 'group'),
};
