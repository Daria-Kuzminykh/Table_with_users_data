import React, { FC } from 'react';
import ReactDOM from 'react-dom';

interface IPortal {
  children: React.ReactNode;
}

const Portal: FC<IPortal> = ({ children }) => {
  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return ReactDOM.createPortal(children, node);
};

export default Portal;
