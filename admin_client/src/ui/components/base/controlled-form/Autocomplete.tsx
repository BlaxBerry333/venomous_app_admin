import type { NamedExoticComponent } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Menu } from "~/ui/components/base/menu";
import { Icon } from "~/ui/components/customs";
import { BlankContentImage } from "~/ui/components/design";
import { Popper, PopperPlacement } from "../popper";
import type { SelectOptionType } from "./Select";
import type { TextFieldProps } from "./TextField";
import TextField from "./TextField";

export type AutocompleteProps = Omit<TextFieldProps, "select" | "value" | "onChange"> & {
  options: SelectOptionType[];
  value?: SelectOptionType["value"];
  onChange?: (option: undefined | SelectOptionType) => void;
};

const Autocomplete: NamedExoticComponent<AutocompleteProps> = memo(
  ({ options = [], value: propsValue = "", onChange: propsOnChange, helperText, ...props }) => {
    const [inputTitle, setInputTitle] = useState<string>("");

    // ----------------------------------------------------------------------------------------------------

    const [showAllOptions, setShowAllOptions] = useState<boolean>(false);

    const optionsFiltered = useMemo<SelectOptionType[]>(() => {
      if (showAllOptions) return options;
      if (!options) return [];
      return options.filter((option) => {
        return String(option.title || "")
          .toLowerCase()
          .includes(inputTitle.toLowerCase());
      });
    }, [options, inputTitle, showAllOptions]);

    const getOptionSelectedByValue = useCallback(
      (value: SelectOptionType["value"]) => options.find((option) => option.value === value),
      [options],
    );
    const getOptionSelectedByTitle = useCallback(
      (title: SelectOptionType["title"]) => options.find((option) => option.title === title),
      [options],
    );

    // ----------------------------------------------------------------------------------------------------

    useEffect(() => {
      setInputTitle(getOptionSelectedByValue(propsValue)?.title || "");
    }, [propsValue, setInputTitle, getOptionSelectedByValue]);

    // ----------------------------------------------------------------------------------------------------

    const handleValueChange = useCallback(
      (title: string) => {
        if (title === "") {
          setInputTitle("");
        } else {
          setInputTitle(title);
        }
        setShowAllOptions(false);
        propsOnChange?.(getOptionSelectedByTitle(title));
      },
      [setInputTitle, setShowAllOptions, propsOnChange, getOptionSelectedByTitle],
    );

    const handleOptionSelect = useCallback(
      (option: SelectOptionType, callback: VoidFunction) => {
        setInputTitle(String(option.title));
        setShowAllOptions(true);
        propsOnChange?.(option);
        callback?.();
      },
      [setInputTitle, setShowAllOptions, propsOnChange],
    );

    // ----------------------------------------------------------------------------------------------------

    return (
      <Popper
        placement={PopperPlacement.bottom}
        autoWidth
        popperContentSx={{ marginTop: helperText ? "-28px !important" : "0 !important" }}
        handleOnClose={() => setShowAllOptions(true)}
        renderPopperTrigger={(params) => (
          <TextField
            value={inputTitle}
            onClick={params.handleOpen}
            onChange={handleValueChange}
            clearable
            showClearButton={Boolean(inputTitle)}
            handleOnClear={() => {
              setInputTitle("");
              setShowAllOptions(true);
              props?.handleOnClear?.();
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

export default Autocomplete;
