import React from 'react';

import Button from '../../controls/Button';

export interface IModalHeaderProps {
  title?: string;
  closeIcon?: null;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalHeader = (props: IModalHeaderProps) => {
  const { title, closeIcon, onClose } = props;
  return (
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
  );
};

export default ModalHeader;
