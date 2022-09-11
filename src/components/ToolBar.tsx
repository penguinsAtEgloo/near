import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Brush from '../icons/Brush';
import Palette from '../icons/Palette';
import Refresh from '../icons/Refresh';
import Undo from '../icons/Undo';
import CanvasDraw from 'react-canvas-draw';
import ClearDialog from '../dialog/ClearDialog';
import { useRecoilState, useRecoilValue } from 'recoil';
import { erasedLinesState } from '../atoms/ErasedLines';
import { linesState } from '../atoms/Lines';
import Redo from '../icons/Redo';
import WidthToolbar from './WidthToolbar';
import ColorToolbar from './ColorToolbar';

const TOOL_MODE = { color: 'color', width: 'width' } as const;
type ToolMode = typeof TOOL_MODE[keyof typeof TOOL_MODE];

function ToolBar({
  canvasDraw,
}: {
  canvasDraw: CanvasDraw | null;
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

  const parsedLines: string[] = useMemo(() => {
    if (!lines) return [];
    const lineObj = JSON.parse(lines);
    return lineObj.lines;
  }, [lines]);

  const undo = useCallback(() => {
    if (!canvasDraw) return;
    if (parsedLines.length === 0) return;
    const newErasedLines: string[] = [
      ...erasedLines,
      parsedLines[parsedLines.length - 1],
    ];
    setErasedLines(newErasedLines);
    canvasDraw.undo();
  }, [canvasDraw, erasedLines, parsedLines, setErasedLines]);

  const redo = useCallback(() => {
    if (!canvasDraw) return;
    if (erasedLines.length === 0) return;
    if (!lines) return;
    const lastErased = erasedLines[erasedLines.length - 1];
    const curLines = JSON.parse(lines);
    curLines.lines.push(lastErased);
    setErasedLines(erasedLines.slice(0, -1));
    canvasDraw.loadSaveData(JSON.stringify(curLines), true);
  }, [canvasDraw, erasedLines, lines, setErasedLines]);

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

  useEffect(() => {
    const handleToolMode = () => {
      setToolMode(null);
    };
    document.addEventListener('pointerdown', handleToolMode);
    return () => document.removeEventListener('pointerdown', handleToolMode);
  }, []);

  return (
    <>
      <div className="relative w-[280px] flex py-4 space-x-7 justify-center items-center rounded-full bg-black">
        <button
          className="flex space-x-6"
          type="button"
          onClick={handleWidthButton}
        >
          <Brush />
        </button>
        <button
          className="flex space-x-6 items-center"
          type="button"
          onClick={handleColorButton}
        >
          <Palette />
        </button>
        <button type="button" onClick={requestClear}>
          <Refresh />
        </button>
        <button type="button" onClick={undo}>
          <Undo color={parsedLines.length === 0 ? 'gray' : 'white'} />
        </button>
        <button type="button" onClick={redo}>
          <Redo color={erasedLines.length === 0 ? 'gray' : 'white'} />
        </button>
      </div>
      <WidthToolbar
        className="absolute -top-16 "
        isShown={toolMode === 'width'}
        onClose={() => {}}
      />
      <ColorToolbar
        className="absolute -top-16 "
        isShown={toolMode === 'color'}
        onClose={() => {}}
      />
      <ClearDialog
        isOpen={showClearDialog}
        onClose={closeClearDialog}
        onClear={clear}
      />
    </>
  );
}

export default ToolBar;
