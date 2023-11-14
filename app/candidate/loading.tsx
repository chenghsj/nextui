import React from 'react';
import { Spinner } from '@nextui-org/spinner';

type Props = {};

function CandidateLoading({}: Props) {
  return <Spinner className='container' />;
}

export default CandidateLoading;
