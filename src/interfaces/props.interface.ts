import React from 'react';

export interface IDialogFactory {
  Component?: any;
  onClosed?: () => void;
  onAfterClosed?: () => void;
  [x: string]: any;
}

export interface IConfirmProps {
  isVisible?: boolean;
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  message?: string;
  afterClose?: () => void;
  onClickClose?: React.MouseEventHandler<HTMLButtonElement>;
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
  onClosed?: () => void;
}

export interface IWarningConfig extends IDialogFactory, Pick<IConfirmProps, 'title' | 'message'> {}
