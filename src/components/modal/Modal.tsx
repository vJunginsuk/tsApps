import React from 'react';
import classNames from 'classnames';

import ModalHeader from './components/ModalHeader';
import ModalFooter from './components/ModalFooter';

interface IModalProps {
  open: boolean;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  children?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  deleteText?: string;
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  onBakClose?: () => void;
  footer?: null;
  className?: string;
  width?: string;
  style?: React.CSSProperties;
  closeIcon?: null;
  fullIcon?: boolean;
  contentClassName?: string;
}

const Modal = (props: IModalProps) => {
  const {
    title,
    children,
    open,
    onClose,
    onOk,
    onCancel,
    onDelete,
    footer,
    okText,
    cancelText,
    deleteText,
    className,
    width,
    style,
    closeIcon,
  } = props;

  // ## classname, style
  const classesWrap = classNames('os-modal-wrap', className);
  const styles = {
    width: width,
    ...style,
  };

  return (
    <div className={open ? 'os-modal' : 'os-hide'}>
      <div className="os-modal-mask" />
      <div className={classesWrap} style={styles}>
        {/* header */}
        <ModalHeader title={title} closeIcon={closeIcon} onClose={onClose} />
        {/* contents */}
        <section>{children}</section>
        {/* footer */}
        {footer !== null && (
          <ModalFooter
            okText={okText}
            cancelText={cancelText}
            deleteText={deleteText}
            onOk={onOk}
            onCancel={onCancel}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
