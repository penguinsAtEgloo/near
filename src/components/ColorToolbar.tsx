import clsx from 'clsx';
import React from 'react';
import { useRecoilState } from 'recoil';
import { penColorState } from '../atoms/PenColor';

const COLOR_SET = ['#FFFFFF', '#000000', '#FF0000', '#FFF500', '#001AFF'];

function ColorToolbar({
  className,
  isShown,
}: {
  className?: string;
  isShown: boolean;
}): React.ReactElement {
  const [penColor, setPenColor] = useRecoilState(penColorState);
  const setColorValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPenColor(value);
  };

  return (
    <div
      className={clsx(
        'w-[280px] flex py-4 space-x-7 justify-center items-center rounded-full bg-black',
        !isShown && 'hidden',
        className
      )}
    >
      {COLOR_SET.map((color) => {
        return (
          <button
            className="flex"
            key={color}
            type="button"
            onClick={() => setPenColor(color)}
          >
            <div
              className={clsx(
                'w-3.5 h-3.5 rounded-full',
                color === '#000000' && 'border border-white'
              )}
              style={{ backgroundColor: color }}
            />
          </button>
        );
      })}
      <label className="relative flex cursor-pointer">
        <div
          className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-red-600 to-blue-600"
          style={{ backgroundColor: penColor }}
        />
        <input
          className="invisible w-0 h-0 bg-white"
          type="color"
          onChange={setColorValue}
        />
      </label>
      <div className="Triangle absolute left-[52px] -bottom-3.5" />
    </div>
  );
}

export default ColorToolbar;
