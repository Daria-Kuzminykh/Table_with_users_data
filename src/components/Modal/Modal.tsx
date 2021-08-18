import React, { FC } from 'react';
import styles from './modal.module.scss';
import CloseIcon from '../icons/CloseIcon';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../../constants';
import Loading from '../Loading';
import useEventClick from '../../hooks/useEventClick';
import Portal from '../Portal';

interface IModal {
  children: React.ReactNode;
  title: string;
  loading?: boolean;
}

const Modal: FC<IModal> = ({ children, title, loading }) => {
  const ref = useEventClick();
  const history = useHistory();
  function handlerClick() {
    history.push(PATHS.table);
  }
  return (
    <Portal
      children={
        <>
          <div className={styles.overflow} />
          <div className={styles.modal} ref={ref}>
            {loading && <Loading />}
            <button className={styles.modal__closeBtn} onClick={handlerClick}>
              <CloseIcon />
            </button>
            <h2 className={styles.modal__title}>{title}</h2>
            {children}
          </div>
        </>
      }
    />
  );
};

export default Modal;
