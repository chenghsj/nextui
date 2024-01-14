import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function ErrorMessage({ children }: Props) {
  return <div className='absolute text-sm'>{children}</div>;
}

export default ErrorMessage;
