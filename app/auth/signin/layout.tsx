import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

function SinginLayout({ children }: Props) {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='inline-block max-w-lg justify-center text-center'>
        {children}
      </div>
    </section>
  );
}

export default SinginLayout;
