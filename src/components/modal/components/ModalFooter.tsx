import React from 'react';

import Button from '../../controls/Button';

export interface IModalFooter {
  className?: string;
  okText?: string;
  cancelText?: string;
  deleteText?: string;
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalFooter = (props: IModalFooter) => {
  const { className, okText, cancelText, deleteText, onOk, onCancel, onDelete } = props;
  return (
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
  );
};

export default ModalFooter;
