'use client';

import React, { FC, useState } from 'react';
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Avatar, Card, CardBody, Image, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { useIsClient } from '@uidotdev/usehooks';
import ReactPlayer from 'react-player';
import { PressEvent } from '@react-types/shared';


import { imageURL, userTagList, userVideoURLList } from '@/data/db';
import { EditButton, TagButton } from '../custom-button';
import { nFormatter } from '@/utils/n-formatter';
import { dateFormatter } from '@/utils/date-formatter';
import cn from '@/utils/cn';
import ProfileModal from './edit-modal/profile-modal';
import { ModalContentProvider } from './edit-modal/modal-content-provider';
import { ISessionValue, withAuth } from '../hoc/with-auth';


dayjs.extend(duration);

export enum ModalTypeEnum {
  Profile_Cover = 'Profile_Cover',
  Video_Resume = 'Video_Resume',
  Profile = 'Profile',
  Work_Exp = 'Work_Exp',
  Education = 'Education'
}

type Props = {
  candidate: ICandidatePage;
};

const section_padding = 'px-10 lg:px-[200px]';

const section_title = 'text-2xl md:text-6xl font-bold italic';

const avatar_size_company_school = 'min-w-unit-20 min-h-unit-20  md:min-w-[120px] md:min-h-[120px]';

const Candidate: FC<Props & ISessionValue> = ({ candidate, session }) => {
  const isClient = useIsClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modaltype, setModalType] = useState<keyof typeof ModalTypeEnum>('' as keyof typeof ModalTypeEnum);

  const handleOnPress = (e: PressEvent) => {
    const modalType = (e.target as HTMLButtonElement).value as keyof typeof ModalTypeEnum;
    setModalType(modalType);
    onOpen();
  };

  return (
    <>
      <Modal
        className='h-[80%]'
        radius='sm'
        size='4xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => {
            let editModal;

            switch (modaltype) {
              case ModalTypeEnum.Profile:
                editModal = (
                  <ProfileModal
                    modalType={modaltype}
                    user={session?.user}
                  />
                );
                break;
              default:
                editModal = <></>;
                break;
            }
            return (
              <ModalContentProvider onClose={onClose}>
                {editModal}
              </ModalContentProvider>
            );
          }}
        </ModalContent>
      </Modal>
      {/* about */}
      <section className='relative top-0 w-full pb-10'>
        <EditButton
          value={ModalTypeEnum.Profile_Cover}
          onPress={handleOnPress}
        />
        <Image
          radius='none'
          src={imageURL}
          alt='profile background cover'
          classNames={{
            wrapper: 'w-full h-40 md:h-52 lg:h-64 xl:h-[360px] !max-w-full',
            img: 'w-full h-full object-cover',
          }}
        />
        <div className={cn(
          'flex flex-col gap-2 md:gap-5',
          'text-gray_b dark:text-white',
          section_padding
        )}>
          <EditButton
            value={ModalTypeEnum.Profile}
            onPress={handleOnPress}
          />
          <Avatar
            isBordered
            src={session?.user?.image!}
            classNames={{
              base: 'w-24 h-24 md:w-32 md:h-32 lg:w-[160px] lg:h-[160px] mt-4',
            }}
          />
          <div className='text-3xl md:text-4xl font-bold'>
            {session?.user!.name}
          </div>
          <div className='font-bold italic'>
            11 Years of NCS. Seeing all of your reactions to our #NCSNostalgia
            week has been truly humbling and we couldn&apos;t be more thankful.
          </div>
          <div className='flex gap-3 flex-wrap'>
            {userTagList.map((singleTag, index) => (
              <TagButton
                key={index}
                value={singleTag}
              >
                {singleTag}
              </TagButton>
            ))}
          </div>
        </div>
      </section >
      {/** video */}
      <section className='flex flex-col relative'>
        <EditButton
          className='relative ml-auto'
          value={ModalTypeEnum.Video_Resume}
          onPress={handleOnPress}
        />
        <div className={cn(
          section_title,
          section_padding
        )}>
          My Video Resume
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 sm:p-10'>
          {candidate.videos.map((singleVideo, index) => (
            <Card
              shadow='none'
              radius='sm'
              key={index}
              classNames={{
                base: 'w-full rounded bg-transparent',
                body: 'rounded-none p-0',
              }}
            >
              <CardBody className='overflow-hidden'>
                <div className='player-wrapper mb-5'>
                  {isClient && (
                    <ReactPlayer
                      className='react-player'
                      width='100%'
                      height='100%'
                      url={singleVideo.url}
                      controls
                    />
                  )}
                </div>
                <div className='flex flex-col gap-1 dark:gap-2'>
                  <div className='flex gap-3 flex-wrap'>
                    {singleVideo.tags?.map(singleTag => (
                      <TagButton
                        key={singleVideo.id}
                        value={singleTag}
                      >
                        {singleTag}
                      </TagButton>
                    ))}
                  </div>
                  <div className='font-bold italic text-xl md:text-4xl'>
                    {singleVideo.title}
                  </div>
                  <div className='flex gap-3 text-gray_l2 dark:text-gray_l1 italic'>
                    <span>
                      {singleVideo.applications} applications
                    </span>
                    <span>
                      {nFormatter(singleVideo.views, 0)} views
                    </span>
                    <span>
                      {dateFormatter(new Date().getTime(), singleVideo.created)} ago
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
      <section className='relative flex flex-col pb-10'>
        <EditButton
          className='relative ml-auto'
          value={ModalTypeEnum.Work_Exp}
          onPress={handleOnPress}
        />
        <div className={cn(
          section_padding,
          'flex flex-col gap-10'
        )}>
          <div className={cn(
            section_title
          )}>
            Work Experience
          </div>
          {candidate.experience.work.map(singleWork => (
            <div key={singleWork.company} className='flex flex-col gap-5'>
              <div key={singleWork.company} className='flex gap-5'>
                <Avatar
                  className={cn(
                    avatar_size_company_school
                  )}
                  src={singleWork.companyImgURL}
                />
                <div className='flex flex-col gap-2'>
                  <div className='text-4xl font-bold italic'>
                    {singleWork.company}
                  </div>
                  <div className='text-base font-bold italic'>
                    {singleWork.position}
                    <br />
                    {singleWork.time}
                  </div>
                  <div>
                  </div>
                  <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, unde explicabo praesentium laborum distinctio facere cumque a vitae ut, quam error fugiat, dolorum vero. Incidunt ipsam architecto perspiciatis, temporibus animi maiores? Sunt sapiente dolorum voluptatem, blanditiis omnis ad perspiciatis tempora fugiat eos amet neque vero iure facilis atque, sed repellat.
                  </div>
                </div>
              </div>
              <div className='flex gap-3 flex-wrap'>
                {singleWork.tags?.map(singleTag => (
                  <TagButton
                    key={singleTag}
                    className='bg-brand'
                  >
                    {singleTag}
                  </TagButton>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className='relative flex flex-col pb-10'>
        <EditButton
          className='relative ml-auto'
          onPress={onOpen}
          value={ModalTypeEnum.Education}
        />
        <div className={cn(
          section_padding,
          'flex flex-col gap-10'
        )}>
          <div className={cn(
            section_title
          )}>
            Education
          </div>
          {candidate.education.school.map(singleEdu => (
            <div key={singleEdu.name} className='flex flex-col gap-5'>
              <div key={singleEdu.name} className='flex gap-5'>
                <Avatar
                  className={cn(
                    avatar_size_company_school
                  )}
                  src={singleEdu.schoolImgURL}
                />
                <div className='flex flex-col gap-2'>
                  <div className='text-4xl font-bold italic'>
                    {singleEdu.name}
                  </div>
                  <div className='text-base font-bold italic'>
                    {singleEdu.degree}
                    <br />
                    {singleEdu.time}
                  </div>
                  <div>
                  </div>
                  <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, unde explicabo praesentium laborum distinctio facere cumque a vitae ut, quam error fugiat, dolorum vero. Incidunt ipsam architecto perspiciatis, temporibus animi maiores? Sunt sapiente dolorum voluptatem, blanditiis omnis ad perspiciatis tempora fugiat eos amet neque vero iure facilis atque, sed repellat.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default withAuth(Candidate);
