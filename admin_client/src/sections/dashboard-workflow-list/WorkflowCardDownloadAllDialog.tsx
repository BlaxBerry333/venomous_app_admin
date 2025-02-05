import { memo, Suspense, useCallback, useState, type NamedExoticComponent } from "react";

import { Icon } from "@iconify/react";
import { debounce } from "lodash-es";

import MuiChip from "@mui/material/Chip";
import MuiStack from "@mui/material/Stack";

import { CustomConfirmDialog } from "~/common/components/custom/dialogs";
import { toast } from "~/common/components/custom/snackbar";
import type useBoolean from "~/common/hooks/useBoolean";
import useTranslation from "~/common/hooks/useTranslation";
import { SupportedFileTypes } from "~/common/types/tools";
import { downloadWorkflowDataList } from "~/services/apis-hooks/workflow";

const WorkflowCardDownloadAllDialog: NamedExoticComponent<{
  confirmDialog: ReturnType<typeof useBoolean>;
}> = memo(({ confirmDialog }) => {
  const { t } = useTranslation();

  const [selectedFileTypes, setSelectedFileTypes] = useState<SupportedFileTypes[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSubmit = debounce(async () => {
    Promise.allSettled(
      selectedFileTypes.map(async (fileType) => await downloadWorkflowDataList(fileType)),
    )
      .then((results) => {
        for (const item of results) {
          if (item.status === "fulfilled") {
            toast.success(`下载成功！${item.value.fileName}`);
          }
          if (item.status === "rejected") {
            toast.error("下载失败！" + (item.reason as Error).message);
          }
        }
      })
      .catch((error) => {
        toast.error("下载失败！" + (error as Error).message);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, 2000);

  const checkIsSelected = useCallback(
    (fileType: SupportedFileTypes): boolean => selectedFileTypes.includes(fileType),
    [selectedFileTypes],
  );

  const handleClickChip = useCallback(
    (fileType: SupportedFileTypes) => {
      if (!checkIsSelected(fileType)) setSelectedFileTypes([...selectedFileTypes, fileType]);
      else setSelectedFileTypes(selectedFileTypes.filter((item) => item !== fileType));
    },
    [selectedFileTypes, checkIsSelected],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <Suspense>
      <CustomConfirmDialog
        isOpen={confirmDialog.value}
        onClose={confirmDialog.setFalse}
        onConfirm={() => {
          setIsFetching(true);
          handleSubmit();
        }}
        disabledConfirm={selectedFileTypes.length === 0}
        disableCancel={isFetching}
        isConfirming={isFetching}
        title={t("common.tooltips.confirm-download-file-type")}
        confirmText={t("common.buttons.download")}
        content={
          <MuiStack rowGap={1} columnGap={1}>
            {Object.values(SupportedFileTypes).map((fileType) => (
              <MuiChip
                key={fileType}
                label={`.${fileType}`}
                variant="outlined"
                color={checkIsSelected(fileType) ? "primary" : "default"}
                icon={
                  checkIsSelected(fileType) ? (
                    <Icon icon="solar:check-circle-linear" width={20} />
                  ) : undefined
                }
                sx={{ typography: "subtitle2" }}
                onClick={() => handleClickChip(fileType)}
              />
            ))}
          </MuiStack>
        }
      />
    </Suspense>
  );
});

export default WorkflowCardDownloadAllDialog;
