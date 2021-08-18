import React, {FC} from 'react';
import styles from './error.module.scss';

const Error: FC = () => {
  return (
    <div className={styles.error}>
      <p className={styles.error__text}>К сожалению произошла ошибка...</p>
    </div>
  );
};

export default Error;
