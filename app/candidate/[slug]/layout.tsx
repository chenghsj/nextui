import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import getURL from '@/utils/get-url';

type Props = {
  children: React.ReactNode;
};

async function fetchData() {
  const res = await fetch(getURL('/api'));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res.json());
    }, 100);
  });
}

async function CandidateLayout({ children }: Props) {
  const data = await fetchData();
  console.log(data);
  const session = await getServerSession();

  // if (!session) {
  //   redirect('/auth/signin');
  // }

  return <div className='w-full'>{children}</div>;
}

export default CandidateLayout;
