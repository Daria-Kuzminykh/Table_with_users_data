import React, { FC } from 'react';
import styles from './loading.module.scss';
import LoadingIcon from '../icons';

const Loading: FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner}>
        <LoadingIcon />
      </div>
    </div>
  );
};

export default Loading;
