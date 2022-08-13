import React, { useCallback, useState } from 'react';
import Brush from '../icons/Brush';
import Palette from '../icons/Palette';
import ClearAll from '../icons/ClearAll';
import Undo from '../icons/Undo';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import CanvasDraw from 'react-canvas-draw';
import ClearDialog from './ClearDialog';

function ToolBar({
  canvasDraw,
  onProceed,
}: {
  canvasDraw: CanvasDraw | null;
  onProceed: () => void;
}) {
  const [showSlider, setShowSlider] = useState(false);
  const handleShowSlider = useCallback(
    () => setShowSlider((prev) => !prev),
    []
  );
  const [showClearDialog, setShowClearDialog] = useState(false);
  const closeClearDialog = useCallback(() => setShowClearDialog(false), []);

  const [penWidth, setPenWidth] = useRecoilState(penWidthState);
  const setPenColor = useSetRecoilState(penColorState);
  const setWidthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setPenWidth(value);
  };
  const setColorValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPenColor(value);
  };
  const requestClear = useCallback(() => {
    setShowClearDialog(true);
  }, []);
  const clear = useCallback(() => {
    setShowClearDialog(false);
    canvasDraw?.clear();
  }, [canvasDraw]);
  const undo = useCallback(() => {
    canvasDraw?.undo();
  }, [canvasDraw]);
  return (
    <div className="flex px-11 py-4 space-x-7 items-center rounded-2xl bg-black">
      <button className="relative" type="button" onClick={handleShowSlider}>
        <Brush />
        {showSlider && (
          <input
            className="absolute -top-6 -left-10"
            type="range"
            value={penWidth}
            min={1}
            max={20}
            onChange={setWidthValue}
          />
        )}
      </button>
      <label className="relative flex cursor-pointer">
        <input
          className="invisible w-0 h-0 bg-white"
          type="color"
          onChange={setColorValue}
        />
        <Palette />
      </label>
      <button type="button" onClick={requestClear}>
        <ClearAll />
      </button>
      <button type="button" onClick={undo}>
        <Undo />
      </button>
      <button className="text-white" type="button" onClick={onProceed}>
        &gt;
      </button>
      <ClearDialog
        isOpen={showClearDialog}
        onClose={closeClearDialog}
        onClear={clear}
      />
    </div>
  );
}

export default ToolBar;
