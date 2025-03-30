import type { NamedExoticComponent } from "react";
import { memo, useCallback, useState } from "react";

import MuiChip from "@mui/material/Chip";

import { Icon, toast, Typography } from "~/ui/components";
import ModalActions from "~/ui/components/base/modal/ModalActions";
import type { SupportedFileExtensionsType } from "~/utils/custom/file";
import { downloadWorkflowDataList } from "~/utils/libs/apis/_hooks/workflows";

const ConfirmModalContentOfDownload: NamedExoticComponent = memo(() => {
  const { isFetching, handleSubmit, handleClickChip, checkIsSelected } =
    useConfirmModalContentOfDownload();

  return (
    <>
      <Typography component="div" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {supportedFileExtensions.map((extension) => (
          <MuiChip
            key={extension}
            label={extension}
            variant="outlined"
            color={checkIsSelected(extension) ? "primary" : "default"}
            icon={
              checkIsSelected(extension) ? (
                <Icon icon="solar:check-circle-linear" width={20} />
              ) : undefined
            }
            sx={{ typography: "subtitle2" }}
            onClick={() => handleClickChip(extension)}
          />
        ))}
      </Typography>
      <ModalActions
        closeModal={() => {}}
        isConfirmLoading={isFetching}
        handleConfirm={handleSubmit}
        confirmText="下载"
      />
    </>
  );
});

export default ConfirmModalContentOfDownload;

// ----------------------------------------------------------------------------------------------------

const supportedFileExtensions: SupportedFileExtensionsType[] = [".csv", ".xlsx", ".json"];

export function useConfirmModalContentOfDownload() {
  const [selectedFileExtensions, setSelectedFileExtensions] = useState<
    SupportedFileExtensionsType[]
  >([supportedFileExtensions[0]]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    setIsFetching(true);
    Promise.allSettled(
      selectedFileExtensions.map(
        async (extension) => await downloadWorkflowDataList(extension.slice(1)),
      ),
    )
      .then((results) => {
        for (const item of results) {
          if (item.status === "fulfilled") {
            toast.success(`下载成功！${item.value?.fileName ?? ""}`);
          }
          if (item.status === "rejected") {
            toast.error("下载失败！" + (item.reason as Error).message);
          }
        }
      })
      .catch((error) => toast.error("下载失败！" + (error as Error).message))
      .finally(() => setIsFetching(false));
  }, [selectedFileExtensions]);

  const checkIsSelected = useCallback(
    (extension: SupportedFileExtensionsType): boolean => selectedFileExtensions.includes(extension),
    [selectedFileExtensions],
  );

  const handleClickChip = useCallback(
    (extension: SupportedFileExtensionsType) => {
      if (!checkIsSelected(extension))
        setSelectedFileExtensions([...selectedFileExtensions, extension]);
      else setSelectedFileExtensions(selectedFileExtensions.filter((item) => item !== extension));
    },
    [selectedFileExtensions, checkIsSelected],
  );

  return {
    isFetching,
    handleSubmit,
    handleClickChip,
    checkIsSelected,
  };
}
