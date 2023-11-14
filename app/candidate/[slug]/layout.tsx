import React from 'react';
import getURL from '@/utils/getURL';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

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

  if (!session) {
    redirect('/auth/signin');
  }


  return <div className='container'>{children}</div>;
}

export default CandidateLayout;
