import clsx from 'clsx';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';

const PEN_WIDTH_LIST = [0.25, 0.5, 1, 2, 4];

function WidthToolbar({
  className,
  isShown,
}: {
  className?: string;
  isShown: boolean;
}): React.ReactElement {
  const setPenWidth = useSetRecoilState(penWidthState);

  return (
    <div
      className={clsx(
        'w-[280px] flex py-[13px] space-x-7 justify-center items-center rounded-full bg-black',
        !isShown && 'hidden',
        className
      )}
    >
      {PEN_WIDTH_LIST.map((width) => {
        return (
          <button
            key={width}
            className="flex justify-center items-center"
            style={{ padding: `${10 - width}px` }}
            type="button"
            onClick={() => setPenWidth(width)}
          >
            <div
              className="rounded-full bg-white"
              style={{ width: `${width * 2}px`, height: `${width * 2}px` }}
            />
          </button>
        );
      })}
      <div className="Triangle absolute left-0 -bottom-3.5" />
    </div>
  );
}

export default WidthToolbar;
