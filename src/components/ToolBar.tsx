<<<<<<< HEAD
import React, { useCallback, useState } from 'react';
import Brush from '../icons/Brush';
import Palette from '../icons/Palette';
import ClearAll from '../icons/ClearAll';
import Undo from '../icons/Undo';
import CanvasDraw from 'react-canvas-draw';
import ClearDialog from '../dialog/ClearDialog';
import ColorButton from './ColorButton';
import BrushButton from './BrushButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { penColorState } from '../atoms/PenColor';
import { erasedLinesState } from '../atoms/ErasedLines';
import { linesState } from '../atoms/Lines';

const TOOL_MODE = { color: 'color', width: 'width' } as const;
type ToolMode = typeof TOOL_MODE[keyof typeof TOOL_MODE];

const COLOR_SET = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
  yellow: '#FFF500',
  blue: '#001AFF',
};

function ToolBar({
  canvasDraw,
  onProceed,
}: {
  canvasDraw: CanvasDraw | null;
  onProceed: () => void;
}): React.ReactElement {
  const [toolMode, setToolMode] = useState<ToolMode | null>(null);

  const [showClearDialog, setShowClearDialog] = useState(false);
  const closeClearDialog = useCallback(() => setShowClearDialog(false), []);
  const requestClear = useCallback(() => setShowClearDialog(true), []);
  const [erasedLines, setErasedLines] = useRecoilState(erasedLinesState);
  const lines = useRecoilValue(linesState);

  const clear = useCallback(() => {
    setShowClearDialog(false);
    setErasedLines([]);
    canvasDraw?.clear();
  }, [canvasDraw, setErasedLines]);

  const undo = useCallback(() => {
    if (!canvasDraw) return;
    const lineStr: string | undefined = canvasDraw.getSaveData();
    if (lineStr) {
      const lineObj = JSON.parse(lineStr);
      const lines: never[] = lineObj.lines;
      const newErased: never[] = [...erasedLines, lines[lines.length - 1]];
      setErasedLines(newErased);
    }
    canvasDraw?.undo();
  }, [canvasDraw, erasedLines, setErasedLines]);

  const redo = useCallback(() => {
    if (!canvasDraw) return;
    if (erasedLines.length === 0) return;
    const lastErased = erasedLines[erasedLines.length - 1];
    const curLines = JSON.parse(lines);
    curLines.lines.push(lastErased);
    setErasedLines(erasedLines.slice(0, -1));
    canvasDraw.loadSaveData(JSON.stringify(curLines), true);
  }, [canvasDraw, erasedLines, lines, setErasedLines]);

  const [penColor, setPenColor] = useRecoilState(penColorState);
  const setColorValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPenColor(value);
  };

  const handleWidthButton = useCallback(() => {
    if (toolMode) {
      setToolMode(null);
      return;
    }
    setToolMode('width');
  }, [toolMode]);

  const handleColorButton = useCallback(() => {
    if (toolMode) {
      setToolMode(null);
      return;
    }
    setToolMode('color');
  }, [toolMode]);

  return (
    <div className="w-[320px] flex px-11 py-4 space-x-7 items-center rounded-2xl bg-black">
      {toolMode !== 'color' && (
        <>
          <button
            className="flex space-x-6"
            type="button"
            onClick={handleWidthButton}
          >
            <Brush />
          </button>
          {toolMode === 'width' && (
            <div className="w-full flex justify-between items-center">
              <BrushButton size={1} />
              <BrushButton size={2} />
              <BrushButton size={4} />
              <BrushButton size={7} />
              <BrushButton size={10} />
            </div>
          )}
        </>
      )}
      {toolMode !== 'width' && (
        <>
          <button
            className="flex space-x-6 items-center"
            type="button"
            onClick={handleColorButton}
          >
            <Palette />
          </button>
          {toolMode === 'color' && (
            <div className="w-full flex justify-between">
              <ColorButton color={COLOR_SET.white} />
              <ColorButton
                className="border border-white"
                color={COLOR_SET.black}
              />
              <ColorButton color={COLOR_SET.red} />
              <ColorButton color={COLOR_SET.yellow} />
              <ColorButton color={COLOR_SET.blue} />
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
            </div>
          )}
        </>
      )}
      {!toolMode && (
        <>
          <button type="button" onClick={requestClear}>
            <ClearAll />
          </button>
          <button type="button" onClick={undo}>
            <Undo />
          </button>
          <button className="w-6 h-6 text-white" type="button" onClick={redo}>
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
=======
import React, { useCallback, useState } from 'react';
import Brush from '../icons/Brush';
import Palette from '../icons/Palette';
import ClearAll from '../icons/ClearAll';
import Undo from '../icons/Undo';
import CanvasDraw from 'react-canvas-draw';
import ClearDialog from '../dialog/ClearDialog';
import ColorButton from './ColorButton';
import BrushButton from './BrushButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { penColorState } from '../atoms/PenColor';
import { erasedLinesState } from '../atoms/ErasedLines';
import { linesState } from '../atoms/Lines';

const TOOL_MODE = { color: 'color', width: 'width' } as const;
type ToolMode = typeof TOOL_MODE[keyof typeof TOOL_MODE];

const COLOR_SET = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
  yellow: '#FFF500',
  blue: '#001AFF',
};

function ToolBar({
  canvasDraw,
  onProceed,
}: {
  canvasDraw: CanvasDraw | null;
  onProceed: () => void;
}): React.ReactElement {
  const [toolMode, setToolMode] = useState<ToolMode | null>(null);

  const [showClearDialog, setShowClearDialog] = useState(false);
  const closeClearDialog = useCallback(() => setShowClearDialog(false), []);
  const requestClear = useCallback(() => setShowClearDialog(true), []);
  const [erasedLines, setErasedLines] = useRecoilState(erasedLinesState);
  const lines = useRecoilValue(linesState);

  const clear = useCallback(() => {
    setShowClearDialog(false);
    setErasedLines([]);
    canvasDraw?.clear();
  }, [canvasDraw, setErasedLines]);

  const undo = useCallback(() => {
    if (!canvasDraw) return;
    const lineStr: string | undefined = canvasDraw.getSaveData();
    if (lineStr) {
      const lineObj = JSON.parse(lineStr);
      const lines: never[] = lineObj.lines;
      const newErased: never[] = [...erasedLines, lines[lines.length - 1]];
      setErasedLines(newErased);
    }
    canvasDraw?.undo();
  }, [canvasDraw, erasedLines, setErasedLines]);

  const redo = useCallback(() => {
    if (!canvasDraw) return;
    if (erasedLines.length === 0) return;
    const lastErased = erasedLines[erasedLines.length - 1];
    const curLines = JSON.parse(lines);
    curLines.lines.push(lastErased);
    setErasedLines(erasedLines.slice(0, -1));
    canvasDraw.loadSaveData(JSON.stringify(curLines), true);
  }, [canvasDraw, erasedLines, lines, setErasedLines]);

  const [penColor, setPenColor] = useRecoilState(penColorState);
  const setColorValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPenColor(value);
  };

  const handleWidthButton = useCallback(() => {
    if (toolMode) {
      setToolMode(null);
      return;
    }
    setToolMode('width');
  }, [toolMode]);

  const handleColorButton = useCallback(() => {
    if (toolMode) {
      setToolMode(null);
      return;
    }
    setToolMode('color');
  }, [toolMode]);

  return (
    <div className="w-[320px] flex px-11 py-4 space-x-7 items-center rounded-2xl bg-black">
      {toolMode !== 'color' && (
        <>
          <button
            className="flex space-x-6"
            type="button"
            onClick={handleWidthButton}
          >
            <Brush />
          </button>
          {toolMode === 'width' && (
            <div className="w-full flex justify-between items-center">
              <BrushButton size={1} />
              <BrushButton size={2} />
              <BrushButton size={4} />
              <BrushButton size={7} />
              <BrushButton size={10} />
            </div>
          )}
        </>
      )}
      {toolMode !== 'width' && (
        <>
          <button
            className="flex space-x-6 items-center"
            type="button"
            onClick={handleColorButton}
          >
            <Palette />
          </button>
          {toolMode === 'color' && (
            <div className="w-full flex justify-between">
              <ColorButton color={COLOR_SET.white} />
              <ColorButton
                className="border border-white"
                color={COLOR_SET.black}
              />
              <ColorButton color={COLOR_SET.red} />
              <ColorButton color={COLOR_SET.yellow} />
              <ColorButton color={COLOR_SET.blue} />
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
            </div>
          )}
        </>
      )}
      {!toolMode && (
        <>
          <button type="button" onClick={requestClear}>
            <ClearAll />
          </button>
          <button type="button" onClick={undo}>
            <Undo />
          </button>
          <button className="w-6 h-6 text-white" type="button" onClick={redo}>
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
>>>>>>> 70b1591 (fix: drawing-size)
