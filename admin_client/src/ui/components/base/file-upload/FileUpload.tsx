import type { NamedExoticComponent } from "react";
import { memo, useCallback, useRef, useState } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";

import { Icon } from "~/ui/components/customs";
import { CardClickable } from "../card";
import { Paper } from "../paper";
import { Tooltip } from "../tooltip";
import { Typography } from "../typography";

type FileUploadProps = {
  label?: string;
  sx?: MuiBoxProps["sx"];
};

const FileUpload: NamedExoticComponent<FileUploadProps> = memo(({ label, sx }) => {
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const { inputRef, openInput, handleInputChange } = useFileInput();

  return (
    <MuiBox sx={{ width: 100, ...sx }}>
      <Paper
        hasElevation={false}
        sx={{ p: 0, borderRadius: 4, position: "relative", overflow: "hidden" }}
      >
        <input
          type="file"
          // accept=".json"
          // multiple
          ref={inputRef}
          onChange={(e) => handleInputChange(e, setFileUpload)}
          style={{ display: "none" }}
        />
        <CardClickable
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={openInput}
        >
          <Icon
            icon="solar:cloud-upload-line-duotone"
            width={40}
            sx={{ transform: `translateY(${label ? "-4px" : "0px"})` }}
          />
          <Typography
            variant="caption"
            sx={{ fontSize: 10, color: "text.secondary", position: "absolute", bottom: 8 }}
          >
            {label}
          </Typography>
        </CardClickable>
      </Paper>

      {fileUpload && (
        <Tooltip
          title={`${fileUpload.name} ( ${formatFileSize(fileUpload.size)} )`}
          placement="top"
        >
          <Typography
            variant="caption"
            noWrap
            sx={{ width: "100%", display: "inline-block", textAlign: "center" }}
          >
            {fileUpload.name}
          </Typography>
        </Tooltip>
      )}
    </MuiBox>
  );
});

export default FileUpload;

// ----------------------------------------------------------------------------------------------------

function useFileInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const openInput = useCallback(() => inputRef.current?.click(), []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, callback: (file: File) => void) => {
      const files: FileList | null = e.currentTarget.files;
      if (!files || files?.length === 0) return;
      const file: File = files[0];
      callback(file);

      console.log({
        name: file.name,
        size: file.size,
        mimeType: file.type,
      });
    },
    [],
  );

  return {
    inputRef,
    openInput,
    handleInputChange,
  };
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}
