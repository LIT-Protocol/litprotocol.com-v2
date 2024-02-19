'use client'

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './VideoModal.scss';
import { EXPLAINER_VIDEO_ID } from '@/utils/constants';

export const VideoDialog = () => {

  return (
    <Dialog.Root>
    <Dialog.Trigger asChild>
      <button>Edit profile</button>
      </Dialog.Trigger>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Portal>
            <Dialog.Content className={styles.modal}>
                <div>
                    <iframe
                    title="YouTube Video"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${EXPLAINER_VIDEO_ID}?autoplay=1`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    ></iframe>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  );
};

export default VideoDialog;