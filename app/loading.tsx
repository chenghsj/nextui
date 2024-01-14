import React from 'react';
import { Spinner } from '@nextui-org/spinner';

type Props = {};

function Loading({}: Props) {
  return <Spinner className='flex-grow-[1]' />;
}

export default Loading;
