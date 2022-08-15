import React, { useCallback, useState } from 'react';
import Brush from '../icons/Brush';
import Palette from '../icons/Palette';
import ClearAll from '../icons/ClearAll';
import Undo from '../icons/Undo';
import { useRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import CanvasDraw from 'react-canvas-draw';
import ClearDialog from '../dialog/ClearDialog';

function ToolBar({
  canvasDraw,
  onProceed,
}: {
  canvasDraw: CanvasDraw | null;
  onProceed: () => void;
}): React.ReactElement {
  const [showSlider, setShowSlider] = useState(false);
  const handleShowSlider = useCallback(
    () => setShowSlider((prev) => !prev),
    []
  );
  const [showClearDialog, setShowClearDialog] = useState(false);
  const closeClearDialog = useCallback(() => setShowClearDialog(false), []);

  const [penWidth, setPenWidth] = useRecoilState(penWidthState);
  const [penColor, setPenColor] = useRecoilState(penColorState);
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
      <button
        className="relative flex space-x-6"
        type="button"
        onClick={handleShowSlider}
      >
        <Brush />
        {showSlider && (
          <input
            type="range"
            value={penWidth}
            min={1}
            max={20}
            onChange={setWidthValue}
          />
        )}
      </button>
      {!showSlider && (
        <>
          <label className="relative flex cursor-pointer">
            <div
              className="absolute -left-2.5 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: penColor }}
            />
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
          <button
            className="w-6 h-6 text-white"
            type="button"
            onClick={onProceed}
          >
            &gt;
          </button>
          <ClearDialog
            isOpen={showClearDialog}
            onClose={closeClearDialog}
            onClear={clear}
          />
        </>
      )}
    </div>
  );
}

export default ToolBar;
