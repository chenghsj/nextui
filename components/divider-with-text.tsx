import cn from '@/utils/cn';
import React, { FC, ReactNode } from 'react';

type ClassNamesType = {
  base: string;
  divider: string;
  content: string;
};

type Props = {
  children: ReactNode;
  className?: string;
  classNames?: Partial<ClassNamesType>;
};

const DividerWithText: FC<Props> = ({
  children,
  className,
  classNames,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'relative flex items-center px-1 py-5',
        className,
        classNames?.base
      )}
      {...rest}
    >
      <div
        className={cn(
          'flex-grow border-t border-slate-400',
          classNames?.divider
        )}
      />
      <span
        className={cn(
          'mx-4 flex-shrink text-sm text-gray-400',
          classNames?.content
        )}
      >
        {children}
      </span>
      <div
        className={cn(
          'flex-grow border-t border-slate-400',
          classNames?.divider
        )}
      />
    </div>
  );
};

export default DividerWithText;
