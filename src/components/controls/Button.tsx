import React from 'react';
import classNames from 'classnames';

export type TBtntType = 'outline' | 'primary' | 'text' | 'icon';
export type TBtntSize = 'small' | 'medium' | 'large';

export interface IButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  type?: TBtntType | string;
  icon?: Element;
  size?: TBtntSize | string;
  disabled?: boolean;
  danger?: boolean;
  style?: React.CSSProperties;
}

const Button = (props: IButtonProps) => {
  const { onClick, children, type, disabled, size, danger, icon, style, onKeyDown } = props;
  const classes = classNames(
    'os-btn',
    classNames,
    {
      [`os-btn-${type}`]: type,
      [`os-btn-${size}`]: size,
    },
    disabled && `os-btn-${type}-disabled`,
    danger && `os-btn-${type}-danger`,
  );
  const styles = {
    padding: icon && '0 12px 0 8px',
    ...style,
  };
  return (
    <button className={classes} onClick={onClick} disabled={disabled} style={styles} onKeyDown={onKeyDown}>
      {children}
    </button>
  );
};

export default Button;
