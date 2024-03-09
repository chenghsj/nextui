import { Select, extendVariants } from "@nextui-org/react";
import { input_field_style } from "./input-field";
import cn from "@/utils/cn";

export const select_field_style = {
  label: input_field_style.label,
  base: '-top-2',
  mainWrapper: cn(
    input_field_style.inputWrapper,
    'h-10 md:h-[51px] min-h-0'
  ),
  trigger: 'border-none min-h-0',
  value: input_field_style.input,
  helperWrapper: 'hidden',
};

export const SelectField = extendVariants(Select, {
  defaultVariants: {
    variant: 'bordered',
    radius: 'sm',
    placeholder: ' ',
    labelPlacement: 'outside',
  }
});