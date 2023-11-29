import React from 'react';
import { PressEvent } from '@react-types/shared';
import { TagButton } from '@/components/custom-button';
import { ModalFooter } from '@nextui-org/react';
import { useModalContentContext } from './modal-content-provider';
import { SubmitHandler, useFormContext, FieldValues } from 'react-hook-form';

type Props<TValues> = {
  values: TValues;
};

const ModalApplyButtons = <TValues extends FieldValues,>({
  values
}: Props<TValues>) => {
  const methods = useFormContext();
  const { onClose } = useModalContentContext();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FieldValues> = () => {
    alert(JSON.stringify(values));
  };

  const handleApplyClick = (e: PressEvent) => {
    handleSubmit(onSubmit)();
    onClose();
  };

  return (
    <ModalFooter className='px-10 h-[15%]'>
      <TagButton
        className='rounded-md dark:text-white text-brand border-brand bg-transparent px-10'
        onPress={onClose}
      >
        Cancel
      </TagButton>
      <TagButton
        className='rounded-md bg-brand px-10'
        onPress={handleApplyClick}
      >
        Apply
      </TagButton>
    </ModalFooter>
  );
};

export default ModalApplyButtons;