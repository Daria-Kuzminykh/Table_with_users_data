import React, { FC } from 'react';

import styles from './loadingicon.module.scss';

interface IIcon {
  fill?: string;
  width?: string;
  height?: string;
}

const LoadingIcon: FC<IIcon> = ({ fill = '#7367F0', height = '60', width = '60' }) => {
  return (
    <svg
      className={styles.spinner}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      <path
        fill={fill}
        d="M12.9 3.1c1.3 1.2 2.1 3 2.1 4.9 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-1.9 0.8-3.7 2.1-4.9l-0.8-0.8c-1.4 1.5-2.3 3.5-2.3 5.7 0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.2-0.9-4.2-2.3-5.7l-0.8 0.8z"
      ></path>
    </svg>
  );
};

export default LoadingIcon;
