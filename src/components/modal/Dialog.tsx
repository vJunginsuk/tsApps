import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { IConfirmProps, IDialogFactory, IWarningConfig } from '../../interfaces/props.interface';
import ModalHeader from './components/ModalHeader';
import ModalFooter from './components/ModalFooter';

// hook
const useModal = (isVisible: boolean): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(isVisible);
  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  return [isOpen, setIsOpen];
};

export const destroyFns: Array<() => void> = [];

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
    if (div.parentNode) {
      div.parentNode.removeChild(div);
      root.unmount;
    }
    if (typeof config.onClosed === 'function') {
      config.onClosed();
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
    console.log('config', config);
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
  const onClosedHandler = () => {
    onClosed();
    afterClose();
  };
  const onClickCloseHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClickClose(event);
    setIsOpen(false);
    onClosedHandler();
  };

  const onOkHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClickOk(event);
    setIsOpen(false);
    onClosedHandler();
  };

  return (
    <div className={isOpen ? 'os-modal' : 'os-hide'}>
      <div className="os-modal-mask os-dialog-mask" />
      <div className="os-modal-wrap os-dialog-wrap">
        <ModalHeader title={title} closeIcon={null} />
        <p>{message}</p>
        <ModalFooter
          onOk={onOkHandler}
          okText={confirmButtonText}
          onCancel={onClickCloseHandler}
          cancelText={cancelButtonText}
        />
      </div>
    </div>
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
