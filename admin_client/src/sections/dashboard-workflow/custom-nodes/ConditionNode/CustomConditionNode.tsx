import type { FC } from "react";
import type {
  CustomNodeDataFormValueType,
  CustomNodeProps,
  CustomNodeWrapperProps,
} from "~/common/types/dashboard-workflow";

import { memo, useCallback, useMemo } from "react";

import { CustomNodeTypeName } from "~/common/types/dashboard-workflow";
import { CustomNodeWrapper } from "~/sections/dashboard-workflow/custom-nodes/_CustomNodeWrapper";
import { CustomNodeFormWrapper } from "../_CustomNodeCommonComponents";

const CustomConditionNode: FC<CustomNodeProps> = (nodeProps) => {
  const { data } = nodeProps;

  const multipleConnectionItems = useMemo<CustomNodeWrapperProps["multipleConnectionItems"]>(
    () =>
      data.form?.value?.items?.map((item, index) => ({
        id: item.id,
        text: item.title,
        index,
      })),
    [data.form?.value.items],
  );

  // ----------------------------------------------------------------------------------------------------

  const handleSubmit = useCallback(
    (
      _: CustomNodeDataFormValueType,
      updateFunction: (formValue: CustomNodeDataFormValueType) => void,
    ) => {
      const MOCK_NODE_FORM_VALUE = {
        title: "条件x",
        items: [
          { id: 111, title: "xxx-1" },
          { id: 112, title: "xxx-2" },
        ],
      };
      updateFunction(MOCK_NODE_FORM_VALUE);
    },
    [],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomNodeWrapper
      {...nodeProps}
      type={CustomNodeTypeName.condition}
      isMultipleConnectionSources
      multipleConnectionItems={multipleConnectionItems}
      renderNodeFormComponent={({ handleFormSubmit }) => (
        <CustomNodeFormWrapper
          handleOnFormSubmit={(formValue) => handleSubmit(formValue, handleFormSubmit)}
        >
          ....
        </CustomNodeFormWrapper>
      )}
    />
  );
};

export default memo(CustomConditionNode);
