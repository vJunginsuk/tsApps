import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import Modal from './Modal';
import { IConfirmProps, IDialogFactory, IWarningConfig } from '../../interfaces/props.interface';

// hook
const useModal = (isVisible: boolean): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(isVisible);
  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  return [isOpen, setIsOpen];
};

export const destroyFns: Array<() => void> = [];
console.log('destroyFns', destroyFns);

export const destroyAll = () => {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

// factory
export const factory = ({ Component, ...config }: IDialogFactory) => {
  const portalId = 'portal-root';
  const div = document.createElement('div');
  div.setAttribute('id', portalId);
  const root = createRoot(div);
  document.body.appendChild(div);

  let currentConfig: IDialogFactory = {
    ...config,
    isVisible: true,
    afterClose: () => {
      if (typeof currentConfig.onAfterClose === 'function') {
        currentConfig.onAfterClose();
      }
      destroy(config);
    },
  };

  const destroy = ({ ...config }: IDialogFactory) => {
    // eslint-disable-next-line react/no-deprecated
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    if (typeof config.onClosed === 'function') {
      config.onClosed();

      //document.getElementById(portalId)?.remove();
    }

    for (let i = 0; i < destroyFns.length; i += 1) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  };
  const render = ({ ...config }: IDialogFactory) => {
    setTimeout(() => {
      return Component ? root.render(<Component {...config} />) : new Error('컴포넌트가 없습니다.');
    });
  };
  const update = (newConfig: IDialogFactory) => {
    config = {
      ...currentConfig,
      ...newConfig,
    };
    render(config);
  };
  const close = () => {
    const config = {
      ...currentConfig,
      isVisible: false,
      afterClose: () => {
        if (typeof currentConfig.onAfterClose === 'function') {
          currentConfig.onAfterClose();
          document.getElementById(portalId)?.remove();
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        destroy(config);
      },
    };
    render(config);
  };
  render(currentConfig);
  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
};
// confirm

const Confirm = ({
  afterClose = () => {},
  onClickClose = () => {},
  onOk: onClickOk = () => {},
  isVisible = true,
  title = '',
  onClosed = () => {},
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  message = '',
}: IConfirmProps) => {
  const [isOpen, setIsOpen] = useModal(isVisible);

  const onClickCloseHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClickClose(event);
    setIsOpen(false);
  };

  const onOkHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClickOk(event);
    setIsOpen(false);
  };

  const onClosedHandler = () => {
    onClosed();
    afterClose();
  };

  return (
    <Modal
      open={isOpen}
      // toggle={toggle}
      onClose={onClosedHandler}
      className="modalDialog"
      contentClassName="modalContent"
      data-testid="modal-confirm"
      title={title}
      onOk={onOkHandler}
      okText={confirmButtonText}
      onCancel={onClickCloseHandler}
      cancelText={cancelButtonText}
      closeIcon={null}
    >
      {message}
    </Modal>
  );
};

export const withWarn = (config?: IWarningConfig): IConfirmProps => {
  return {
    ...config,
  };
};

export const confirm = (config?: IConfirmProps) => factory({ ...config, Component: Confirm });

export const warn = (config?: IWarningConfig) => factory({ ...withWarn(config), Component: Confirm });

export default factory;
