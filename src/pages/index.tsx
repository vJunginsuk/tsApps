import { useState } from 'react';

import Button from '../components/controls/Button';
import Modal from '../components/modal/Modal';
import { confirm } from '../components/modal/Dialog';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(true);
  };
  const onClickClose = () => {
    setIsOpen(false);
  };

  const onClickConfirm = () => {
    confirm({ title: '확인여부', message: '이게 맞냐' });
  };
  return (
    <div>
      <Button type="primary" onClick={onClick}>
        modal open
      </Button>
      <Button type="outlieb" onClick={onClickConfirm}>
        Dialog button
      </Button>
      <Modal title="modal header" open={isOpen} onClose={onClickClose}>
        1111111
      </Modal>
    </div>
  );
};

export default Index;
