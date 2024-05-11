import cn from '@/utils/cn';
import {
  Input,
  InputSlots,
  SlotsToClasses,
  extendVariants,
} from '@nextui-org/react';

export const input_field_style: SlotsToClasses<InputSlots> = {
  label:
    'font-semibold italic text-xl md:text-2xl text-gray_b dark:text-white w-fit md:pb-2',
  inputWrapper: cn(
    'border-4 border-gray_b data-[hover=true]:border-gray_b',
    'dark:border-white dark:border-2',
    'bg-transparent data-[focus=true]:!bg-record data-[hover=true]:bg-record',
    'rounded-xl h-fit dark:inputDarkModeOverride'
  ),
  input: cn(
    'dark:inputDarkModeOverride',
    'rounded-lg italic text-base focus:text-white font-semibold focus:outline-none box-border md:p-3'
  ),
  helperWrapper: 'block',
};

export const tag_input_field_style: SlotsToClasses<InputSlots> = {
  ...input_field_style,
  inputWrapper: cn(
    'border-4 border-gray_b data-[hover=true]:border-gray_b',
    'dark:border-white dark:border-2',
    'bg-transparent',
    'rounded-xl h-fit rounded-r-none border-r-0'
  ),
  input:
    'rounded-lg italic text-base font-semibold focus:outline-none autofill:!bg-transparent box-border md:p-3',
  helperWrapper: 'block',
};

export const InputField = extendVariants(Input, {
  defaultVariants: {
    variant: 'bordered',
    radius: 'sm',
    placeholder: ' ',
    labelPlacement: 'outside',
  },
});
