import type { NamedExoticComponent } from "react";
import { memo, useDeferredValue, useState } from "react";

import type { NodeViewProps } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";

const CodeBlockComponent: NamedExoticComponent<NodeViewProps> = memo(
  ({
    node: {
      attrs: { language: defaultLanguage },
    },
    updateAttributes,
    extension,
  }) => {
    const options = extension.options.lowlight.listLanguages();

    const [value, setValue] = useState<string | null>(defaultLanguage);
    const valueDeferred = useDeferredValue<string | null>(value);
    const [inputValue, setInputValue] = useState("");

    return (
      <NodeViewWrapper style={{ position: "relative" }}>
        <MuiAutocomplete
          disablePortal
          value={valueDeferred}
          onChange={(_, newValue) => {
            setValue(newValue);
            updateAttributes({ language: newValue });
          }}
          options={options}
          renderInput={(params) => (
            <MuiTextField sx={{ m: 0, "& .MuiInputBase-root": { py: 0, px: 2 } }} {...params} />
          )}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
            updateAttributes({ language: newInputValue });
          }}
          sx={(theme) => ({
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            borderRadius: "0.5rem",
            backgroundColor: theme.palette.background.paper,
            width: 160,
          })}
          slotProps={{
            paper: { sx: { p: 0, borderRadius: 2 } },
            listbox: { style: { margin: 0, padding: 8 } },
          }}
        />

        <pre>
          <NodeViewContent as="code" />
        </pre>
      </NodeViewWrapper>
    );
  },
);

export default CodeBlockComponent;
