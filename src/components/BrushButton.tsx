import React, { useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import clsx from 'clsx';

function BrushButton({
  className,
  size,
}: {
  className?: string;
  size: number;
}): React.ReactElement {
  const setPenWidth = useSetRecoilState(penWidthState);
  const paddingSize = useMemo(() => {
    if (size >= 10) return 0;
    return 10 - size;
  }, [size]);
  return (
    <button
      className="flex justify-center items-center"
      type="button"
      onClick={() => setPenWidth(size)}
      style={{ padding: `${paddingSize}px` }}
    >
      <div
        className={clsx('rounded-full bg-white', className)}
        style={{ width: `${size * 2}px`, height: `${size * 2}px` }}
      />
    </button>
  );
}

export default BrushButton;
