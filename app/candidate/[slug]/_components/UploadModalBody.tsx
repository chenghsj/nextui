import React, { EventHandler, useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardBody, ModalBody } from '@nextui-org/react';
import { Input, Textarea } from '@nextui-org/input';
import { Upload } from '@/components/icons';
import { Button } from '@nextui-org/button';
import { PressEvent } from '@/types';
import ReactPlayer from 'react-player';

type Props = {};

const skillTags = [''];

function UploadModalBody({}: Props) {
  const [video, setVideo] = useState<File>();
  const [videoURL, setVideoURL] = useState<string>('');

  const uploadVideoRef = useRef<HTMLInputElement>(null);

  const handleUploadVideo = () => {
    // (e.target as HTMLInputElement)
    // e.target.file
    if (uploadVideoRef.current && uploadVideoRef.current.files) {
      setVideo(uploadVideoRef.current?.files[0]);
    }
  };

  const handleUploadVideoPress = () => {
    uploadVideoRef.current?.click();
  };

  useEffect(() => {
    if (video) {
      setVideoURL(URL.createObjectURL(video));
      console.log(video);
    }
  }, [video]);

  return (
    <ModalBody>
      <Card className='h-full'>
        <CardBody className=' flex gap-5 sm:flex-col md:flex-row'>
          <div className='h-full w-full md:w-[60%]'>
            {videoURL ? (
              <ReactPlayer url={videoURL} controls />
            ) : (
              <Card
                shadow='sm'
                className='flex aspect-video w-full flex-col items-center justify-center gap-y-2 border-2 border-dashed border-stone-300 dark:border-stone-500'
                isPressable
                onPress={handleUploadVideoPress}
              >
                <Upload
                  className='fill-stone-500 dark:fill-slate-50'
                  width={30}
                />
                <Input
                  ref={uploadVideoRef}
                  type='file'
                  className='hidden'
                  accept='video/*'
                  onChange={handleUploadVideo}
                >
                  Upload Video
                </Input>
                Upload Video
              </Card>
            )}
            <Button
              className='mt-2'
              isDisabled={!Boolean(videoURL)}
              onPress={() => setVideoURL('')}
            >
              Clear
            </Button>
          </div>
          <div className='flex flex-col gap-y-3 sm:w-full md:w-[40%]'>
            <Input
              classNames={{
                base: 'w-full',
              }}
              variant='bordered'
              type='text'
              label='Title'
              labelPlacement='outside'
              size='lg'
              placeholder='Name your video'
            />
            <Textarea
              classNames={{
                base: 'w-full h-1/3',
                inputWrapper: '!h-full',
                input: 'absolute top-0 left-3 -ml-3 p-6',
              }}
              placeholder='Type something about the video...'
              variant='bordered'
              label='Description'
              labelPlacement='outside'
            />
            <Input
              classNames={{
                base: 'w-full',
              }}
              variant='bordered'
              type='text'
              label='Tags'
              labelPlacement='outside'
              size='lg'
              placeholder='List your features'
            />
          </div>
        </CardBody>
      </Card>
    </ModalBody>
  );
}

export default UploadModalBody;
