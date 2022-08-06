import clsx from 'clsx';
import React from 'react';

function Button({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: React.ReactElement | string | number;
  onClick?: () => void;
}) {
  return (
    <button
      className={clsx('w-9 h-9 border border-gray-700 bg-gray-50', className)}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
