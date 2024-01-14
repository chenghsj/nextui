// not being used

'use client';

import React, { useState, Key, ReactNode } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
} from '@nextui-org/react';

import { WebcamModalBody } from './webcam-modal-body';
import { UploadModalBody } from './upload-modal-body';
import { useModalDisclosureContext } from '@/providers/modal-disclosure-provider';

type Props = {
  children?: ReactNode;
} & Partial<ReturnType<typeof useDisclosure>>;

enum ModalBodyTypeEnum {
  Upload = 'Upload',
  WebcamRecord = 'WebcamRecord',
}

type TabProps = {
  id: string;
  label: string;
  content?: ReactNode;
};

const tabs: TabProps[] = [
  {
    id: ModalBodyTypeEnum.Upload,
    label: 'Upload',
  },
  {
    id: ModalBodyTypeEnum.WebcamRecord,
    label: 'Webcam Record',
  },
];

export function EditorModal({}: Props) {
  const { isOpen, onOpenChange } = useModalDisclosureContext();
  const [modalBodyType, setModalBodyType] = useState<ModalBodyTypeEnum>(
    ModalBodyTypeEnum.Upload
  );

  const handleModalClose = () => {
    console.log('modal closed');
  };

  const handleTabsChange = (key: Key) => {
    setModalBodyType(key as ModalBodyTypeEnum);
  };

  const getModalBody = (type: string) => {
    let modalBody: ReactNode = <></>;

    switch (type) {
      case ModalBodyTypeEnum.Upload:
        modalBody = <UploadModalBody />;
        break;
      case ModalBodyTypeEnum.WebcamRecord:
        modalBody = <WebcamModalBody />;
        break;
      default:
        break;
    }

    return modalBody;
  };

  return (
    <Modal
      size='full'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleModalClose}
      isDismissable={false}
      shouldBlockScroll={false}
      // disableAnimation
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <Tabs onSelectionChange={handleTabsChange}>
                {tabs.map((singleTab) => (
                  <Tab key={singleTab.id} title={singleTab.label} />
                ))}
              </Tabs>
            </ModalHeader>

            {getModalBody(modalBodyType)}

            <ModalFooter className='flex-wrap'>
              {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
              {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
