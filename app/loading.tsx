import React from 'react';
import { Spinner } from '@nextui-org/spinner';

type Props = {};

function Loading({ }: Props) {
  return <Spinner className='container !max-w-full' />;
}

export default Loading;
