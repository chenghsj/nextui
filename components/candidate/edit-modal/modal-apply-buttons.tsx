import React from 'react';
import { PressEvent } from '@react-types/shared';
import { TagButton } from '@/components/custom-button';
import { ModalFooter } from '@nextui-org/react';
import { useModalContentContext } from './modal-content-provider';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { IProfileModalFields } from './profile-modal';

type Props<T> = {
  data: T;
};

const ModalApplyButtons = <T,>({
  data
}: Props<T>) => {
  const methods = useFormContext();
  const { onClose } = useModalContentContext();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IProfileModalFields> = () => {
    alert(JSON.stringify(data));
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