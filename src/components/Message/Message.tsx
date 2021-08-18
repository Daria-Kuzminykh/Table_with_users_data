import React, { FC } from 'react';
import styles from './message.module.scss';
import classNames from 'classnames';

export type MessagePropsType = {
  message: string;
  isError?: boolean;
};

const Message: FC<MessagePropsType> = ({ message, isError }) => {
  return (
    <p className={classNames(styles.message, isError ? styles.message_error : styles.message_success)}>{message}</p>
  );
};

export default Message;
