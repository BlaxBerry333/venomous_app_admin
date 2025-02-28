import type { NamedExoticComponent } from "react";
import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import { debounce } from "lodash-es";

import MuiClickAwayListener from "@mui/material/ClickAwayListener";
import MuiPopper, { type PopperProps as MuiPopperProps } from "@mui/material/Popper";

import { Menu, type MenuProps } from "~/ui/components/base/menu";
import { Icon } from "~/ui/components/customs";
import { BlankContentImage } from "~/ui/components/design";
import type { TextFieldProps } from "./TextField";
import TextField from "./TextField";

type OptionType = MenuProps["list"][number];

export type SelectProps = Omit<TextFieldProps, "select" | "value" | "onChange"> & {
  options: OptionType[];
  value?: OptionType["value"];
  onChange?: (option: undefined | OptionType) => void;
};

const Select: NamedExoticComponent<SelectProps> = memo(
  ({ options = [], value: propsValue = "", onChange: propsOnChange, helperText, ...props }) => {
    const [_inputTitle, _setInputTitle] = useState<string>("");
    const inputTitle = useDeferredValue<string>(_inputTitle);
    const setInputTitle = useRef(debounce((value: string) => _setInputTitle(value), 40));

    // ----------------------------------------------------------------------------------------------------

    const [showAllOptions, setShowAllOptions] = useState<boolean>(false);

    const optionsFiltered = useMemo<OptionType[]>(() => {
      if (showAllOptions) return options;
      if (!options) return [];
      return options.filter((option) => {
        return String(option.title || "")
          .toLowerCase()
          .includes(inputTitle.toLowerCase());
      });
    }, [options, inputTitle, showAllOptions]);

    const getOptionSelectedByValue = useCallback(
      (value: OptionType["value"]) => options.find((option) => option.value === value),
      [options],
    );
    const getOptionSelectedByTitle = useCallback(
      (title: OptionType["title"]) => options.find((option) => option.title === title),
      [options],
    );

    // ----------------------------------------------------------------------------------------------------

    useEffect(() => {
      const debounceFunction = setInputTitle.current;
      return () => {
        debounceFunction.cancel();
      };
    }, []);

    useEffect(() => {
      _setInputTitle(getOptionSelectedByValue(propsValue)?.title || "");
    }, [propsValue, _setInputTitle, getOptionSelectedByValue]);

    // ----------------------------------------------------------------------------------------------------

    const handleValueChange = useCallback(
      (title: string) => {
        if (title === "") {
          _setInputTitle("");
          setInputTitle.current.cancel();
        } else {
          setInputTitle.current(title);
        }
        setShowAllOptions(false);
        propsOnChange?.(getOptionSelectedByTitle(title));
      },
      [_setInputTitle, setShowAllOptions, propsOnChange, getOptionSelectedByTitle],
    );

    const handleOptionSelect = useCallback(
      (option: OptionType, callback: VoidFunction) => {
        _setInputTitle(String(option.title));
        setShowAllOptions(true);
        propsOnChange?.(option);
        callback?.();
      },
      [_setInputTitle, setShowAllOptions, propsOnChange],
    );

    // ----------------------------------------------------------------------------------------------------

    return (
      <Popper
        sx={{ marginTop: helperText ? "-24px !important" : "0 !important" }}
        handleOnClose={() => setShowAllOptions(true)}
        renderPopperTrigger={(params) => (
          <TextField
            value={inputTitle}
            onClick={params.handleOpen}
            onChange={handleValueChange}
            clearable
            showClearButton={Boolean(inputTitle)}
            handleOnClear={() => {
              _setInputTitle("");
              setShowAllOptions(true);
            }}
            endElement={
              <Icon
                icon={
                  params.isOpen
                    ? "solar:alt-arrow-up-bold-duotone"
                    : "solar:alt-arrow-down-bold-duotone"
                }
              />
            }
            helperText={helperText}
            {...props}
          />
        )}
        renderPopperContent={(params) =>
          !optionsFiltered.length ? (
            <BlankContentImage wrapperSx={{ py: 4 }} />
          ) : (
            <Menu
              list={optionsFiltered.map((option) => ({
                ...option,
                selected: option.title === inputTitle,
                onClick: () => handleOptionSelect(option, params.handleClose),
              }))}
            />
          )
        }
      />
    );
  },
);

export default Select;

// ----------------------------------------------------------------------------------------------------

type PopperProps = Omit<MuiPopperProps, "open" | "anchorEl"> & {
  renderPopperTrigger: (popper: ReturnType<typeof usePopper>) => React.ReactNode;
  renderPopperContent: (popper: ReturnType<typeof usePopper>) => React.ReactNode;
  handleOnClose?: () => void;
};

/**
 * Popover 组件是通过 Modal 显现，其触发元素在显示期间仍可被操作
 */
const Popper: NamedExoticComponent<PopperProps> = memo(
  ({ renderPopperTrigger, renderPopperContent, handleOnClose, sx, ...props }) => {
    const popper = usePopper();
    const anchorElementWidth = useMemo(
      () => (popper.anchorEl as Element)?.getBoundingClientRect()?.width || 0,
      [popper.anchorEl],
    );

    useEffect(() => {
      if (!popper.isOpen) {
        handleOnClose?.();
      }
    }, [popper.isOpen, handleOnClose]);

    return (
      <MuiClickAwayListener onClickAway={popper.handleClose}>
        <div>
          {/* Popper Trigger */}
          {renderPopperTrigger(popper)}

          {/* Popper Content */}
          <MuiPopper
            open={popper.isOpen}
            anchorEl={popper.anchorEl}
            sx={{
              width: anchorElementWidth,
              maxHeight: 300,
              overflowY: "scroll",
              borderRadius: "8px",
              border: 1,
              borderColor: "divider",
              backgroundColor: "background.paper",
              px: "4px",
              zIndex: 1100,
              ...sx,
            }}
            {...props}
          >
            {renderPopperContent(popper)}
          </MuiPopper>
        </div>
      </MuiClickAwayListener>
    );
  },
);

function usePopper() {
  const [anchorEl, setAnchorEl] = useState<MuiPopperProps["anchorEl"]>(null);
  const handleOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    isOpen: !!anchorEl,
    anchorEl,
    setAnchorEl,
    handleOpen,
    handleClose,
  };
}
