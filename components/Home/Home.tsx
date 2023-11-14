'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { Link } from '@nextui-org/link';
import { ArrowRight } from '@/components/icons';
import { Accordion, AccordionItem, Button, Input } from '@nextui-org/react';
import cn from '@/utils/cn';

const section_padding = 'px-10 lg:px-40 xl:px-96 py-20';

export default function Home({ accordions, videos }: IHomePage) {
  const [joinEmail, setJoinEmail] = useState('');

  return (
    <>
      <section className={cn(
        'h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)] w-full',
        'flex flex-col items-center'
      )}>
        <div
          className={cn(
            'flex h-[60%] w-full flex-col items-center justify-center bg-brand',
            section_padding
          )}
        >
          <p className='my-2 text-center text-5xl font-bold italic text-white md:text-7xl'>
            Your First Video Resume
          </p>
          <p className='text-center italic text-white'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            voluptatem adipisci aut quo modi error temporibus recusandae
            debitis, fuga cupiditate.
          </p>
          <div className='mt-12 flex h-16 w-full items-center'>
            <Input
              classNames={{
                inputWrapper:
                  'h-16 rounded-xl rounded-r-none border-4 border-r-0 border-gray_b bg-white',
                input: cn(
                  'text-gray_b font-bold',
                  'placeholder:text-gray_b placeholder:font-bold'
                ),
              }}
              placeholder='Enter your email to join the waiting list'
              onValueChange={(value: string) => setJoinEmail(value)}
            />
            <Button
              size='md'
              isIconOnly
              className='h-16 w-16 rounded-l-none rounded-r-xl border-4 border-gray_b bg-record p-4 
						data-[pressed=true]:transform-none'
              startContent={<ArrowRight width={24} />}
              onPress={() => alert(joinEmail)}
            />
          </div>
        </div>
        <div className={cn('flex flex-col items-center', section_padding)}>
          <p className='my-2 text-center text-5xl font-bold italic md:text-7xl'>
            Job? Get It!
          </p>
          <p className='text-center italic'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            ex fuga est asperiores laboriosam nostrum!
          </p>
        </div>
      </section>
      {/* recommend video section */}
      <section className='w-full md:h-[calc(100vh-80px)]'>
        {videos.map((singleVideo, index) => (
          <div
            key={singleVideo.id}
            className={cn(
              'overflow-hidden',
              'md:grid md:h-1/3 md:grid-cols-12 md:gap-0'
            )}
          >
            <div
              className={cn(
                'col-span-6 aspect-video h-full overflow-hidden border-3 border-white md:w-full',
                {
                  'md:order-[1]': index % 2 === 1,
                }
              )}
            >
              <img
                className='h-full w-full object-cover transition-all hover:scale-[1.2]'
                src={singleVideo.url}
              />
            </div>
            <div className='col-span-6 flex flex-col justify-center border-3 border-white bg-gray_b p-5 lg:px-20'>
              <p className='text-4xl font-bold italic text-white'>
                {singleVideo.title}
              </p>
              <p className='mt-3 italic text-white'>
                {singleVideo.description}
              </p>
            </div>
          </div>
        ))}
      </section>
      {/* accordion section */}
      <section className='h-[calc(100vh-80px)] w-full py-4'>
        <div className={cn('flex flex-col items-center', section_padding)}>
          <p className='my-2 text-center  text-5xl font-bold italic md:text-7xl'>
            Suspendisse vitae
          </p>
          <p className='text-center italic'>
            At lacus vitae nulla sagittis scelerisque nisl. Pellentesque duis
            cursus vestibulum, facilisi ac, sed faucibus.
          </p>
          <div className='mt-10 w-full'>
            <Accordion itemClasses={{}}>
              {accordions.map((singleAccordion) => (
                <AccordionItem
                  classNames={{
                    base: cn(
                      'border-4 border-gray_b',
                      'dark:border-gray_l1 dark:border-2',
                      'first:rounded-t-xl last:rounded-b-xl',
                      'bg-brand data-[open=true]:bg-record', // title
                      '[&_button]:p-4',
                      '[&_svg]:data-[open=true]:text-black [&_svg]:text-white [&_svg]:w-6 [&_svg]:h-6', // arrow
                      '[&_section]:last:rounded-b-lg' // content
                    ),
                    title: 'text-white',
                    content: 'bg-white p-4 dark:text-black',
                  }}
                  key={singleAccordion.id}
                  aria-label={singleAccordion.title}
                  title={singleAccordion.title}
                >
                  {singleAccordion.description}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
