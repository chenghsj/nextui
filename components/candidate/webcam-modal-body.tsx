'use client';

import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  Key,
  ReactNode,
  EventHandler,
} from 'react';
import _ from 'lodash';
import {
  ModalBody,
  Button,
  Select,
  SelectItem,
  Input,
  Checkbox,
  Card,
  CardBody,
  CardFooter,
  Skeleton,
  Switch,
} from '@nextui-org/react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import Webcam from 'react-webcam';
import ReactPlayer from 'react-player';

import { IRecordedVideo } from '@/types/candidate-modal/webcam-modal';
import { NoPhotography, PhotoCamera } from '@/components/icons';
import { PressEvent } from '@react-types/shared';

type Props = {
  children?: ReactNode;
};

enum WebcamRecordStatusEnum {
  Recording = 'Recording',
  isPaused = 'isPaused',
  isStopped = 'isStopped',
}

const ButtonContent = {
  Start: () => <div>Press to start</div>,
  Recording: () => (
    <div className='flex items-center'>
      <div className='mr-2 h-4 w-4 rounded-full bg-rose-500'></div>
      Rec
    </div>
  ),
};

const recordedVideos: IRecordedVideo[] = [
  {
    id: '1',
    name: '1',
    url: '/assets/sample-video.mp4',
  },
  {
    id: '1',
    name: '1',
    url: '/assets/sample-video.mp4',
  },
  {
    id: '1',
    name: '1',
    url: '/assets/TabMenuNodeDemo.mp4',
  },
  {
    id: '1',
    name: '1',
    url: '/assets/sample-video.mp4',
  },
  {
    id: '1',
    name: '1',
    url: '/assets/sample-video.mp4',
  },
  {
    id: '1',
    name: '1',
    url: '/assets/sample-video.mp4',
  },
  {
    id: '1',
    name: '1',
    url: '/assets/sample-video.mp4',
  },
];

export function WebcamModalBody({ }: Props) {
  const [isWebcamEnable, setIsWebcamEnable] = useState<boolean>(false);

  const [deviceId, setDeviceId] = useState<Iterable<Key>>(new Set([]));
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [webcamRecordStatus, setWebcamRecordStatus] =
    useState<WebcamRecordStatusEnum>(WebcamRecordStatusEnum.isStopped);
  const [webcamError, setWebcamError] = useState<boolean>(false);

  const countdownRef = useRef<any>(null);
  const [countdownTime, setCountdowntime] = useState(5000);
  const [isStartCountdown, setIsStartCountdown] = useState<boolean>(false);
  const [enableCountdown, setEnableCountdown] = useState<boolean>(true);

  const [replaceWebcamUrl, setReplaceWebcamUrl] = useState<string>('');

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) => {
      const filteredMediaDevices = mediaDevices.filter(
        ({ kind }) => kind === 'videoinput'
      );
      setDevices(filteredMediaDevices);
      setDeviceId(new Set([filteredMediaDevices[0].deviceId]));
    },
    [setDevices]
  );

  const handleUserMediaError = () => {
    setWebcamError(true);
  };

  const handleEnableWebcamChange = () => {
    setIsWebcamEnable(!isWebcamEnable);
    setReplaceWebcamUrl('');
  };

  const handleRecordedVideoPress =
    (recordedVideo: IRecordedVideo) => (e: PressEvent) => {
      setReplaceWebcamUrl(recordedVideo.url);
      setIsWebcamEnable(false);
    };

  const handlePressToStart = () => {
    if (webcamRecordStatus === WebcamRecordStatusEnum.Recording) {
      setWebcamRecordStatus(WebcamRecordStatusEnum.isStopped);
      return;
    }
    if (enableCountdown) {
      if (!isStartCountdown) {
        setIsStartCountdown(true);
        countdownRef.current.start();
      } else {
        countdownRef.current.stop();
        setIsStartCountdown(false);
      }
    } else {
      setWebcamRecordStatus(WebcamRecordStatusEnum.Recording);
    }
  };

  const handleCountdownComplete = () => {
    setIsStartCountdown(false);
    setWebcamRecordStatus(WebcamRecordStatusEnum.Recording);
  };

  const CountdownRenderer = ({ seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return <span>Recording...</span>;
    } else {
      return (
        <span>
          {isStartCountdown ? (
            seconds
          ) : webcamRecordStatus === WebcamRecordStatusEnum.Recording ? (
            <ButtonContent.Recording />
          ) : (
            <ButtonContent.Start />
          )}
        </span>
      );
    }
  };

  const handleCountdownTimeChange = (value: string) => {
    if (value === '0' || value === '') {
      setCountdowntime(1000);
    } else {
      setCountdowntime(parseInt(value) * 1000);
    }
  };

  const handleEnableCountdown = (isSelected: boolean) => {
    setEnableCountdown(isSelected);
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    return () => {
      setCountdowntime(5000);
      setIsStartCountdown(false);
      setWebcamRecordStatus(WebcamRecordStatusEnum.isStopped);
    };
  }, []);

  return (
    <ModalBody className='h-[85%]'>
      <div className='flex h-full gap-3 '>
        <Card className='block w-[20%] overflow-y-scroll'>
          <CardBody className='p-1 first:mt-3 last:mb-3'>
            {recordedVideos.map((singleVideo) => (
              <Card
                className='m-3 rounded-xl'
                key={singleVideo.id}
                isPressable
                onPress={handleRecordedVideoPress(singleVideo)}
              >
                <CardBody className='grid aspect-video content-center overflow-hidden p-0'>
                  <ReactPlayer
                    url={singleVideo.url}
                    width='100%'
                    height='100%'
                  />
                </CardBody>
                {/* <CardFooter className='p-2'>{singleVideo.name}</CardFooter> */}
              </Card>
            ))}
          </CardBody>
        </Card>

        <Card className='container h-full w-[80%] rounded-xl'>
          <CardBody className='h-full justify-between overflow-hidden'>
            <div className='flex justify-between'>
              <Switch
                size='md'
                color='success'
                isSelected={isWebcamEnable}
                onChange={handleEnableWebcamChange}
              >
                Webcam
              </Switch>
              <Select
                className='ml-[auto] w-2/5'
                size='sm'
                variant='bordered'
                disallowEmptySelection
                labelPlacement='outside-left'
                selectedKeys={deviceId}
                onSelectionChange={setDeviceId}
              >
                {devices.map((singleDevice) => (
                  <SelectItem
                    key={singleDevice.deviceId}
                    value={singleDevice.deviceId}
                  >
                    {singleDevice.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {!replaceWebcamUrl && (webcamError || !isWebcamEnable) ? (
              <Skeleton className='my-5 h-full w-full rounded-xl' />
            ) : (
              <div className='container h-[85%]'>
                {replaceWebcamUrl ? (
                  <ReactPlayer
                    url={replaceWebcamUrl}
                    controls
                    width='100%'
                    height='100%'
                  />
                ) : (
                  <Webcam
                    videoConstraints={{
                      width: 1280,
                      height: 720,
                      deviceId: deviceId as string,
                    }}
                    onUserMediaError={handleUserMediaError}
                  />
                )}
              </div>
            )}
            <div className='flex w-full grid-cols-5 flex-col gap-3 md:grid '>
              <div className='col-span-2 flex justify-end'>
                <Checkbox
                  className='col-span-1 mr-1 max-w-full justify-end'
                  defaultSelected
                  disableAnimation
                  onValueChange={handleEnableCountdown}
                  isDisabled={
                    webcamRecordStatus === WebcamRecordStatusEnum.Recording
                  }
                >
                  Countdown
                </Checkbox>
                <div className='w-28'>
                  <Input
                    isDisabled={
                      isStartCountdown ||
                      !enableCountdown ||
                      webcamRecordStatus === WebcamRecordStatusEnum.Recording
                    }
                    fullWidth={false}
                    variant='bordered'
                    type='number'
                    max={10}
                    min={1}
                    endContent='s'
                    value={(countdownTime / 1000).toString()}
                    onValueChange={handleCountdownTimeChange}
                  />
                </div>
              </div>
              <div className='col-span-3'>
                <Button
                  className='w-full'
                  onPress={handlePressToStart}
                  isDisabled={!isWebcamEnable}
                >
                  {enableCountdown ? (
                    <Countdown
                      autoStart={false}
                      ref={countdownRef}
                      date={Date.now() + countdownTime}
                      onComplete={handleCountdownComplete}
                      renderer={CountdownRenderer}
                    />
                  ) : (
                    <>
                      {webcamRecordStatus ===
                        WebcamRecordStatusEnum.Recording ? (
                        <ButtonContent.Recording />
                      ) : (
                        <ButtonContent.Start />
                      )}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </ModalBody>
  );
}
