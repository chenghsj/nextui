import cn from '@/utils/cn';
import React, { FC, ReactNode } from 'react';

type IClassNames = {
  base: string;
  divider: string,
  content: string;
};

type Props = {
  children: ReactNode;
  className?: string;
  classNames?: Partial<IClassNames>;
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
        "relative flex py-5 px-1 items-center",
        className,
        classNames?.base
      )}
      {...rest}
    >
      <div className={cn(
        'flex-grow border-t border-slate-400',
        classNames?.divider
      )} />
      <span className={cn(
        'flex-shrink mx-4 text-gray-400 text-sm',
        classNames?.content
      )}>
        {children}
      </span>
      <div className={cn(
        'flex-grow border-t border-slate-400',
        classNames?.divider
      )} />
    </div>
  );

};

export default DividerWithText;