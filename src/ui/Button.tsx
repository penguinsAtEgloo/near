import clsx from 'clsx';
import React from 'react';

function Button({
  className,
  children,
  onClick,
  disabled,
}: {
  className?: string;
  children?: React.ReactElement | string | number;
  onClick?: () => void;
  disabled?: boolean;
}): React.ReactElement {
  return (
    <button
      className={clsx('w-12 h-12 border border-gray-700 bg-gray-50', className)}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
