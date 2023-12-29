import React from 'react';

type Props = {
  children: React.ReactNode;
};

async function CandidateLayout({ children }: Props) {
  return <div className='w-full'>{children}</div>;
}

export default CandidateLayout;
