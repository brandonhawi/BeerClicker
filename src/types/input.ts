import { BaseSyntheticEvent, MouseEvent } from "react";

export type input = {
  name:
    | "onClick"
    | "onContextMenu"
    | "onDoubleClick"
    | "onDrag"
    | "onDragEnd"
    | "onDragEnter"
    | "onDragExit"
    | "onDragLeave"
    | "onDragOver"
    | "onDragStart"
    | "onDrop"
    | "onMouseDown"
    | "onMouseEnter"
    | "onMouseLeave"
    | "onMouseMove"
    | "onMouseOut"
    | "onMouseOver"
    | "onMouseUp"
    | "onWheel"
    | "onTouchCancel"
    | "onTouchEnd"
    | "onTouchMove"
    | "onTouchStart"
    | "onKeyDown"
    | "onKeyPress"
    | "onKeyUp";
  payload: BaseSyntheticEvent;
};
