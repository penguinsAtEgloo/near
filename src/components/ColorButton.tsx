import React from 'react';
import { useSetRecoilState } from 'recoil';
import { penColorState } from '../atoms/PenColor';
import clsx from 'clsx';

function ColorButton({
  className,
  color,
}: {
  className?: string;
  color: string;
}): React.ReactElement {
  const setPenColor = useSetRecoilState(penColorState);
  return (
    <button
      className="flex"
      type="button"
      onClick={() => {
        setPenColor(color);
      }}
    >
      <div
        className={clsx('w-3.5 h-3.5 rounded-full', className)}
        style={{ backgroundColor: color }}
      />
    </button>
  );
}

export default ColorButton;
