import React, { FC } from 'react';
import styles from './addbutton.module.scss';

interface IAddButton {
  text?: string;
  handlerClick?: VoidFunction;
}

const AddButton: FC<IAddButton> = ({ text, handlerClick }) => {
  return (
    <button className={styles.button} onClick={handlerClick}>
      {text || 'Добавить'}
    </button>
  );
};

export default AddButton;
