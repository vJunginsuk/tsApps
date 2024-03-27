import React from 'react';
import classNames from 'classnames';

import Button from '../controls/Button';

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
        <header>
          <h3>{title}</h3>
          {/* <Button type="icon" icon={<CloseOutline />} onClick={onClose} /> */}
          <div className="os-modal-icon">
            {closeIcon !== null && (
              <Button type="icon" onClick={onClose}>
                닫기
              </Button>
            )}
          </div>
        </header>
        {/* contents */}
        <section>{children}</section>
        {/* footer */}
        {footer !== null && (
          <footer className={className}>
            {okText && (
              <Button size="small" type="primary" onClick={onOk}>
                {okText}
              </Button>
            )}
            {cancelText && (
              <Button size="small" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            {deleteText && (
              <Button size="small" type="primary" danger onClick={onDelete}>
                {deleteText}
              </Button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Modal;
