import clsx from 'clsx';
import React from 'react';
import { useRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';

const PEN_WIDTH_LIST = [0.5, 1, 2, 4, 7];
const CIRCLE_SIZE_LIST = [7, 10, 13, 16, 20];

function WidthToolbar({
  className,
  isShown,
}: {
  className?: string;
  isShown: boolean;
}): React.ReactElement {
  const [penWidth, setPenWidth] = useRecoilState(penWidthState);

  return (
    <div
      className={clsx(
        'w-[280px] flex py-[13px] space-x-7 justify-center items-center rounded-full bg-black',
        !isShown && 'hidden',
        className
      )}
    >
      {PEN_WIDTH_LIST.map((width, i) => {
        const size = CIRCLE_SIZE_LIST[i];
        return (
          <button
            key={width}
            className="flex justify-center items-center"
            style={{ padding: `${7 - width}px` }}
            type="button"
            onClick={() => setPenWidth(width)}
          >
            <div
              className={clsx(
                'rounded-full',
                width === penWidth
                  ? 'bg-black, border-2 border-yellow-300'
                  : 'bg-white'
              )}
              style={{ width: `${size}px`, height: `${size}px` }}
            />
          </button>
        );
      })}
      <div className="Triangle absolute left-0 -bottom-[13px]" />
    </div>
  );
}

export default WidthToolbar;
