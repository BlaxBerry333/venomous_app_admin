import type { BoxProps as MuiBoxProps } from "@mui/material/Box";
import type { PaperProps as MuiPaperProps } from "@mui/material/Paper";
import { type PopoverProps as MuiPopoverProps } from "@mui/material/Popover";

export enum BasePosition {
  TOP_LEFT = "top-left",
  TOP_CENTER = "top-center",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_CENTER = "bottom-center",
  BOTTOM_RIGHT = "bottom-right",
  RIGHT_TOP = "right-top",
  RIGHT_CENTER = "right-center",
  RIGHT_BOTTOM = "right-bottom",
  LEFT_TOP = "left-top",
  LEFT_CENTER = "left-center",
  LEFT_BOTTOM = "left-bottom",
}

export function getPositionOfMuiPopover(position: BasePosition): {
  anchorOrigin?: MuiPopoverProps["anchorOrigin"];
  transformOrigin?: MuiPopoverProps["transformOrigin"];
  slotPaperSx?: MuiPaperProps["sx"];
} {
  switch (position) {
    /**
     * Top
     */
    case BasePosition.TOP_LEFT:
      return {
        anchorOrigin: { vertical: "top", horizontal: "center" },
        transformOrigin: { vertical: "bottom", horizontal: "right" },
        slotPaperSx: { transform: "translateY(-10px) !important" },
      };
    case BasePosition.TOP_CENTER:
      return {
        anchorOrigin: { vertical: "top", horizontal: "center" },
        transformOrigin: { vertical: "bottom", horizontal: "center" },
        slotPaperSx: { transform: "translateY(-10px) !important" },
      };
    case BasePosition.TOP_RIGHT:
      return {
        anchorOrigin: { vertical: "top", horizontal: "center" },
        transformOrigin: { vertical: "bottom", horizontal: "left" },
        slotPaperSx: { transform: "translateY(-10px) !important" },
      };
    /**
     * Bottom
     */
    case BasePosition.BOTTOM_LEFT:
      return {
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        transformOrigin: { vertical: "top", horizontal: "right" },
        slotPaperSx: { transform: "translateY(10px) !important" },
      };
    case BasePosition.BOTTOM_CENTER:
      return {
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        transformOrigin: { vertical: "top", horizontal: "center" },
        slotPaperSx: { transform: "translateY(10px) !important" },
      };
    case BasePosition.BOTTOM_RIGHT:
      return {
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        transformOrigin: { vertical: "top", horizontal: "left" },
        slotPaperSx: { transform: "translateY(10px) !important" },
      };
    /**
     * Left
     */
    case BasePosition.LEFT_TOP:
      return {
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        transformOrigin: { vertical: "bottom", horizontal: "right" },
        slotPaperSx: { transform: "translateX(-10px) !important" },
      };
    case BasePosition.LEFT_CENTER:
      return {
        anchorOrigin: { vertical: "center", horizontal: "left" },
        transformOrigin: { vertical: "center", horizontal: "right" },
        slotPaperSx: { transform: "translateX(-10px) !important" },
      };
    case BasePosition.LEFT_BOTTOM:
      return {
        anchorOrigin: { vertical: "top", horizontal: "left" },
        transformOrigin: { vertical: "top", horizontal: "right" },
        slotPaperSx: { transform: "translateX(-10px) !important" },
      };
    /**
     * Right
     */
    case BasePosition.RIGHT_TOP:
      return {
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "bottom", horizontal: "left" },
        slotPaperSx: { transform: "translateX(10px) !important" },
      };
    case BasePosition.RIGHT_BOTTOM:
      return {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "left" },
        slotPaperSx: { transform: "translateX(10px) !important" },
      };
    case BasePosition.RIGHT_CENTER:
    default:
      return {
        anchorOrigin: { vertical: "center", horizontal: "right" },
        transformOrigin: { vertical: "center", horizontal: "left" },
        slotPaperSx: { transform: "translateX(10px) !important" },
      };
  }
}

export function getPositionOfArrow(position: BasePosition): MuiBoxProps["sx"] {
  switch (position) {
    /*
     * Top
     */
    case BasePosition.TOP_LEFT:
      return {
        bottom: "-4px !important",
        right: "4px !important",
        transform: "rotate(45deg) !important",
      };
    case BasePosition.TOP_CENTER:
      return {
        bottom: "-4px !important",
        left: "50% !important",
        transform: "translateX(-50%) rotate(45deg) !important",
      };
    case BasePosition.TOP_RIGHT:
      return {
        bottom: "-4px !important",
        left: "4px !important",
        transform: "rotate(45deg) !important",
      };
    /*
     * Bottom
     */
    case BasePosition.BOTTOM_LEFT:
      return {
        top: "-4px !important",
        right: "4px !important",
        transform: "rotate(45deg) !important",
      };
    case BasePosition.BOTTOM_CENTER:
      return {
        top: "-4px !important",
        left: "50% !important",
        transform: "translateX(-50%) rotate(45deg) !important",
      };
    case BasePosition.BOTTOM_RIGHT:
      return {
        top: "-4px !important",
        left: "4px !important",
        transform: "rotate(45deg) !important",
      };
    /*
     * Left
     */
    case BasePosition.LEFT_TOP:
      return {
        bottom: "-4px !important",
        right: "-4px !important",
        transform: "translateY(-50%) rotate(45deg) !important",
      };
    case BasePosition.LEFT_CENTER:
      return {
        top: "50% !important",
        right: "-4px !important",
        transform: "translateY(-50%) rotate(45deg) !important",
      };
    case BasePosition.LEFT_BOTTOM:
      return {
        top: "12px !important",
        right: "-4px !important",
        transform: "translateY(-50%) rotate(45deg) !important",
      };
    /*
     * Right
     */
    case BasePosition.RIGHT_BOTTOM:
      return {
        top: "12px !important",
        left: "-4px !important",
        transform: "translateY(-50%) rotate(45deg) !important",
      };
    case BasePosition.RIGHT_TOP:
      return {
        bottom: "-4px !important",
        left: "-4px !important",
        transform: "translateY(-50%) rotate(45deg) !important",
      };
    case BasePosition.RIGHT_CENTER:
    default:
      return {
        top: "50% !important",
        left: "-4px !important",
        transform: "translateY(-50%) rotate(45deg) !important",
      };
  }
}
