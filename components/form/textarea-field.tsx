import { Textarea, extendVariants } from "@nextui-org/react";
import { input_field_style } from "./input-field";
import cn from "@/utils/cn";

export const textarea_field_style = {
  label: cn(input_field_style.label, 'pb-2'),
  inputWrapper: cn(input_field_style.inputWrapper, '!h-[160px]'),
  input: cn(input_field_style.input, 'max-h-[135px]'),
  helperWrapper: 'block',
};

export const TextareaField = extendVariants(Textarea, {
  defaultVariants: {
    labelPlacement: 'outside'
  }
});