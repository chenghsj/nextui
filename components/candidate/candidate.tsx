'use client';

import React, { FC, useEffect } from 'react';
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Avatar, Image } from '@nextui-org/react';
import { PressEvent } from '@react-types/shared';
import cn from '@/utils/cn';

import { AddButton, EditButton, TagButton } from '../custom-button';
import { Education, WorkExperience } from '@prisma/client';
import { UserWithProfile } from '@/lib/types';
import { useModalDisclosureContext } from '@/providers/modal-disclosure-provider';

import CandidateFormModal from './modal/candidate-form-modal';
import { useCandidateModalStore } from '@/hooks/candidate/use-candidate-modal-store';

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
  ...args: Extract<ProfilePressEventType, { type: Type }> extends {
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

const formatDate = (date: Date) =>
  date.toString().substring(0, 10).replaceAll('-', '/');

// TODO: form modal validation using valibot resolver?

export const Candidate: FC<CandidateProps> = ({ candidate }) => {
  const { onOpen } = useModalDisclosureContext();
  const {
    setCandidate,
    setModalMode,
    setModalType,
    setWorkExperience,
    setEducation,
  } = useCandidateModalStore();

  useEffect(() => {
    setCandidate(candidate);
  }, [candidate]);

  const handleOnPress: ProfilePressEvent =
    (...args) =>
    (e: PressEvent) => {
      const modalType = (e.target as HTMLButtonElement)
        .value as `${ModalTypeEnum}`;

      if (args[0] === 'Edit') {
        if (
          modalType === 'work-experience' &&
          candidate.profile?.workExperiences
        ) {
          setWorkExperience(
            candidate.profile?.workExperiences.filter(
              (singleWork) => singleWork.id === args[1]
            )[0]
          );
        } else if (modalType === 'education' && candidate.profile?.educations) {
          setEducation(
            candidate.profile?.educations.filter(
              (singleEdu) => singleEdu.id === args[1]
            )[0]
          );
        }
      } else {
        if (modalType === 'work-experience') {
          setWorkExperience({} as WorkExperience);
        } else if (modalType === 'education') {
          setEducation({} as Education);
        }
      }
      setModalMode(args[0]);
      setModalType(modalType);
      onOpen();
    };

  return (
    <div aria-label='candidate page'>
      <CandidateFormModal />
      {/* about */}
      <section className='relative top-0 w-full pb-10'>
        <EditButton
          aria-label='edit cover'
          className='mt-10'
          value={ModalTypeEnum.Profile_Cover}
          onPress={handleOnPress('Edit', candidate.id)}
        />
        {candidate.profile?.coverURL ? (
          <Image
            radius='none'
            src={candidate.profile?.coverURL || ''}
            alt='profile background cover'
            classNames={{
              wrapper: 'w-full h-40 md:h-52 lg:h-64 xl:h-[360px] !max-w-full',
              img: 'w-full h-full object-cover',
            }}
          />
        ) : (
          <div className='h-40 w-full !max-w-full bg-slate-400 md:h-52 lg:h-64 xl:h-[360px]' />
        )}
        <div
          className={cn(
            'flex flex-col gap-2 md:gap-5',
            'text-gray_b dark:text-white',
            section_padding
          )}
        >
          <EditButton
            aria-label='edit profile'
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
          <div className='whitespace-pre-wrap font-bold italic'>
            {candidate.profile?.bio}
          </div>
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
            aria-label='edit video'
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
      <section
        aria-label='work experience'
        className='relative flex flex-col pb-10'
      >
        <div className={cn(section_padding, 'flex flex-col gap-10')}>
          <div className={cn(section_title)}>
            Work Experience
            <AddButton
              aria-label='add work experience'
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
                    name: 'text-2xl md:text-6xl font-bold',
                  }}
                />
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold italic md:text-4xl'>
                    {singleWork.company}
                  </div>
                  <div className='text-base font-bold italic'>
                    {singleWork.position} | {singleWork.workType}
                    <br />
                    {formatDate(singleWork.startDate)} -{' '}
                    {singleWork.currentJob
                      ? 'Now'
                      : formatDate(singleWork.endDate!)}
                  </div>
                  <div className='hidden md:block'></div>
                  <div className='whitespace-pre-wrap break-all'>
                    {singleWork.desc}
                  </div>
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
                aria-label='edit work experience'
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
              aria-label='add education'
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
                aria-label='edit education'
                className='absolute'
                value={ModalTypeEnum.Education}
                onPress={handleOnPress('Edit', singleEdu.id)}
              />
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};
