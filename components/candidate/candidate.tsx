'use client';

import React, { FC, ReactElement, useState } from 'react';
import _ from 'lodash';
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Avatar, Image, Modal, ModalContent, ModalHeader } from '@nextui-org/react';
import { PressEvent } from '@react-types/shared';
import cn from '@/utils/cn';

import { AddButton, EditButton, TagButton } from '../custom-button';
import { ModalContentProvider, ModalModeEnum } from '@/providers/candidate/modal-content-provider';
import { Education, WorkExperience } from '@prisma/client';
import { UserWithProfile } from '@/lib/types';
import { useIsClient } from 'usehooks-ts';
import { useModalDisclosureContext } from '@/providers/modal-disclosure-provider';
import ProfileCoverModal from './modal/profile-cover-modal';
import ProfileModal from './modal/profile-modal';
import WorkExpModal from './modal/work-exp-modal';

dayjs.extend(duration);

export enum ModalTypeEnum {
  Profile_Cover = 'profile-cover',
  Video_Resume = 'video-resume',
  Profile = 'profile',
  Work_Exp = 'work-experience',
  Education = 'education',
}

type CandidateProps = {
  candidate: UserWithProfile;
};

type ProfilePressEventType =
  | {
    type: 'Add';
  }
  | {
    type: 'Edit';
    id: number | string;
  };

type ProfilePressEvent = <Type extends ProfilePressEventType['type']>(
  ...args: Extract<ProfilePressEventType, { type: Type; }> extends {
    id: infer ID;
  }
    ? [type: Type, id: ID]
    : [type: Type]
) => (e: PressEvent) => void;

const section_padding = 'px-10 lg:px-[200px]';

const section_title = 'text-2xl md:text-6xl font-bold italic';

const experience_avatar_style = cn(
  'border-4 dark:border-2 md:border-8 md:dark:border-5',
  'border-gray_b dark:border-white',
  'min-w-unit-16 min-h-unit-16 md:min-w-[120px] md:min-h-[120px]'
);

// TODO: add submitting state
// TODO: form modal validation using valibot resolver?

export const Candidate: FC<CandidateProps> = ({ candidate }) => {
  const isClient = useIsClient();
  const { isOpen, onOpen, onOpenChange } = useModalDisclosureContext();

  const [workExp, setWorkExp] = useState<WorkExperience>({} as WorkExperience);
  const [education, setEducation] = useState<Education>({} as Education);
  const [modaltype, setModalType] = useState<`${ModalTypeEnum}`>('profile');
  const [mode, setMode] = useState<`${ModalModeEnum}`>('Add');

  const handleOnPress: ProfilePressEvent =
    (...args) =>
      (e: PressEvent) => {
        const modalType = (e.target as HTMLButtonElement)
          .value as `${ModalTypeEnum}`;
        setMode(args[0]);

        if (args[0] === 'Edit') {
          if (
            modalType === 'work-experience' && candidate.profile?.workExperiences) {
            setWorkExp(
              candidate.profile?.workExperiences.filter(
                (singleWork) => singleWork.id === args[1]
              )[0]
            );
          } else if (modalType === 'education' && candidate.profile?.educations) {
            setEducation(candidate.profile?.educations.filter(
              singleEdu => singleEdu.id === args[1])[0]
            );
          }
        } else {
          setWorkExp({} as WorkExperience);
          setEducation({} as Education);
        }
        setModalType(modalType);
        onOpen();
      };

  let editModal: ReactElement;
  let formInitialValues = {};
  let title = '';

  switch (modaltype) {
    case 'profile-cover':
      title = 'Cover';
      editModal = <ProfileCoverModal />;
      break;
    case 'video-resume':
      title = 'Video Resume';
      editModal = <></>;
      break;
    case 'profile':
      title = 'Profile';
      formInitialValues = candidate.profile!;
      editModal = <ProfileModal />;
      break;
    case 'work-experience':
      title = 'Work Experience';
      formInitialValues = workExp;
      editModal = <WorkExpModal />;
      break;
    case 'education':
      title = 'Education';
      formInitialValues = education;
      editModal = <WorkExpModal />;
      break;
    default:
      editModal = <></>;
      break;
  }

  return (
    <>
      <ModalContentProvider
        formInitialValues={formInitialValues}
        mode={mode}
        modalType={modaltype}
        candidate={candidate}
      >
        <Modal
          className='h-[80%]'
          radius='sm'
          size='4xl'
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          hideCloseButton
        >
          <ModalContent>
            <ModalHeader className='h-[10%] p-5 text-2xl font-bold leading-10 sm:h-[15%] md:p-10 md:text-3xl'>
              {mode} {title}
            </ModalHeader>
            <form className='h-[90%] sm:h-[85%]'>{editModal}</form>
          </ModalContent>
        </Modal>
      </ModalContentProvider>
      {/* about */}
      <section className='relative top-0 w-full pb-10'>
        <EditButton
          className='mt-10'
          value={ModalTypeEnum.Profile_Cover}
          onPress={handleOnPress('Edit', candidate.id)}
        />
        {candidate.profile?.coverURL ? (
          <Image
            radius='none'
            src={candidate.profile?.coverURL || ""}
            alt='profile background cover'
            classNames={{
              wrapper: 'w-full h-40 md:h-52 lg:h-64 xl:h-[360px] !max-w-full',
              img: 'w-full h-full object-cover',
            }}
          />
        ) :
          <div className='w-full h-40 md:h-52 lg:h-64 xl:h-[360px] !max-w-full bg-slate-400' />
        }
        <div
          className={cn(
            'flex flex-col gap-2 md:gap-5',
            'text-gray_b dark:text-white',
            section_padding
          )}
        >
          <EditButton
            className='mt-10'
            value={ModalTypeEnum.Profile}
            onPress={handleOnPress('Edit', candidate.id)}
          />
          <Avatar
            isBordered
            name={candidate.name || ''}
            src={candidate.image!}
            classNames={{
              base: 'w-24 h-24 md:w-32 md:h-32 lg:w-[160px] lg:h-[160px] mt-4',
            }}
          />
          <div className='text-3xl font-bold md:text-4xl'>
            {candidate.profile?.fullName || candidate.name}
          </div>
          <div className='font-bold italic whitespace-pre-wrap'>{candidate.profile?.bio}</div>
          <div className='flex flex-wrap gap-3'>
            {candidate.profile?.tags?.map((singleTag, index) => (
              <TagButton key={index} value={singleTag}>
                {singleTag}
              </TagButton>
            ))}
          </div>
        </div>
      </section>
      {/** video */}
      {/* <section className='flex flex-col relative'>
        <div className={cn(
          section_title,
          section_padding
        )}>
          Video Resume
          <EditButton
            className='absolute'
            value={ModalTypeEnum.Video_Resume}
            onPress={handleOnPress('Edit', candidate.profile?.id || '')}
          />
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 sm:p-10'>
          {candidate.profile?.videoResumes.map((singleVideo, index) => (
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
                      url={singleVideo.url || ''}
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
      </section> */}
      <section className='relative flex flex-col pb-10'>
        <div className={cn(section_padding, 'flex flex-col gap-10')}>
          <div className={cn(section_title)}>
            Work Experience
            <AddButton
              className='absolute'
              value={ModalTypeEnum.Work_Exp}
              onPress={handleOnPress('Add')}
            />
          </div>
          {candidate.profile?.workExperiences?.map((singleWork) => (
            <div key={singleWork.id} className='flex flex-col gap-5'>
              <div key={singleWork.company} className='flex gap-5'>
                <Avatar
                  name={singleWork.company[0].toUpperCase()}
                  src={singleWork.companyImg || ''}
                  classNames={{
                    base: cn(experience_avatar_style),
                    name: 'text-2xl md:text-6xl font-bold'
                  }}
                />
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl md:text-4xl font-bold italic'>
                    {singleWork.company}
                  </div>
                  <div className='text-base font-bold italic'>
                    {singleWork.position} | {singleWork.workType}
                    <br />
                    {singleWork.startDate.toString().substring(0, 10).replaceAll('-', '/')} -{' '}
                    {singleWork.currentJob
                      ? 'Now'
                      : singleWork.endDate?.toString().substring(0, 10).replaceAll('-', '/')}
                  </div>
                  <div></div>
                  <div className='whitespace-pre-wrap'>{singleWork.desc}</div>
                </div>
              </div>
              <div className='flex flex-wrap gap-3'>
                {singleWork.tags?.map((singleTag) => (
                  <TagButton key={singleTag} className='bg-brand'>
                    {singleTag}
                  </TagButton>
                ))}
              </div>
              <EditButton
                className='absolute'
                onPress={handleOnPress('Edit', singleWork.id)}
                value={ModalTypeEnum.Work_Exp}
              />
            </div>
          ))}
        </div>
      </section>
      {/* <section className='relative flex flex-col pb-10'>
        <div className={cn(
          section_padding,
          'flex flex-col gap-10'
        )}>
          <div className={cn(
            section_title
          )}>
            Education

            <AddButton
              className='absolute'
              value={ModalTypeEnum.Education}
              onPress={handleOnPress('Add')}
            />
          </div>
          {candidate.profile?.educations.map(singleEdu => (
            <div key={singleEdu.id} className='flex flex-col gap-5'>
              <div className='flex gap-5'>
                <Avatar
                  name={singleEdu.schoolName}
                  src={singleEdu.schoolImg || ''}
                  classNames={{
                    base: cn(experience_avatar_style),
                    name: 'text-2xl md:text-6xl font-bold'
                  }}
                />
                <div className='flex flex-col gap-2'>
                  <div className='text-4xl font-bold italic'>
                    {singleEdu.schoolName}
                  </div>
                  <div className='text-base font-bold italic'>
                    {singleEdu.degree}
                    <br />
                    {singleEdu.startYear.toString().substring(0, 10).replaceAll('-', '/')} -{' '}
                    {singleEdu.endYear?.toString().substring(0, 10).replaceAll('-', '/')}
                  </div>
                  <div>
                  </div>
                  <div className='whitespace-pre-wrap'>
                    {singleEdu.desc}
                  </div>
                </div>
              </div>
              <EditButton
                className='absolute'
                value={ModalTypeEnum.Education}
                onPress={handleOnPress('Edit', singleEdu.id)}
              />
            </div>
          ))}
        </div>
      </section> */}
    </>
  );
};
