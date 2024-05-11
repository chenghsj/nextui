'use client';

import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@nextui-org/react';
import { PressEvent, KeyboardEvent } from '@react-types/shared';

import cn from '@/utils/cn';
import { ArrowRight, Close } from '@/components/icons';
import { TagButton } from '@/components/custom-button';
import {
  InputField,
  tag_input_field_style,
} from '@/components/form/input-field';

type Props = {};

type TagsInputType = { name: string; tag: string; tags: string[] };

const maxTagListLength = 6;

const TagsInput = ({}: Props) => {
  const tagListRef = useRef<null | HTMLDivElement>(null);
  const removeFocusRef = useRef<null | HTMLInputElement>(null);

  const {
    setValue,
    register,
    watch,
    setFocus,
    formState: { errors },
  } = useFormContext<TagsInputType>();

  const tag = watch('tag');
  const tagList = watch('tags') || [];

  const handleArrowClick = (e?: PressEvent) => {
    const hashedTag = `#${tag}`;

    if (
      tag &&
      !tagList.includes(hashedTag) &&
      tagList.length <= maxTagListLength
    ) {
      setValue('tags', [...tagList, hashedTag], { shouldDirty: true });
    }
    setValue('tag', '');

    setTimeout(() => {
      tagListRef.current?.scrollIntoView();
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleArrowClick();
    }
  };

  const handleRemoveTag =
    (removedTag: string) =>
    (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      setValue(
        'tags',
        tagList.filter((singleTag) => singleTag !== removedTag),
        { shouldDirty: true }
      );
      console.log(tagList.length);
      if (tagList.length === 1) {
        setFocus('tag');
      } else {
        removeFocusRef.current?.focus();
      }
    };

  return (
    <div className='flex flex-col gap-2 md:gap-5'>
      <div className='mt-6 flex h-16 w-full items-center md:mt-12'>
        <InputField
          label='Your Skill Hashtag'
          labelPlacement='outside'
          placeholder=' '
          value={tag}
          classNames={tag_input_field_style}
          onKeyDown={handleKeyDown}
          {...register('tag')}
          errorMessage={errors.tag?.message}
          autoComplete='off'
        />
        <Button
          size='md'
          isIconOnly
          className={cn(
            'bg-record p-1 data-[pressed=true]:transform-none',
            'rounded-l-none rounded-r-xl',
            'md:h-[51px] md:w-[51px] dark:md:h-[47px] dark:md:w-[47px]',
            'border-4 border-gray_b',
            'dark:border-y-2 dark:border-l-0 dark:border-r-2 dark:border-white'
          )}
          startContent={<ArrowRight className='w-5 text-base' />}
          onPress={handleArrowClick}
        />
      </div>
      <div ref={tagListRef} className='flex flex-wrap gap-3 md:gap-5'>
        {tagList.map((singleTag, index) => (
          <TagButton
            key={singleTag}
            className='flex justify-between'
            endContent={
              <Close
                className='w-4 cursor-pointer transition-all hover:scale-125'
                onClick={handleRemoveTag(singleTag)}
              />
            }
            disableRipple
            disableAnimation
          >
            {singleTag}
          </TagButton>
        ))}
      </div>
      <input className='h-0 w-0' ref={removeFocusRef} />
    </div>
  );
};

export default TagsInput;
