import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { WorkflowsFormValue } from "~/app/features/workflows/_types";
import { useNodeUpdateFormInvalid } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { Button, IconButton, RHF, Typography } from "~/ui/components";
import { FETCH_NODE_FORM, formSchemas } from "./_helpers";

export type FormValueType = WorkflowsFormValue.FetchNode;

const FetchNodeDetail: NamedExoticComponent<{
  nodeId: string;
  defaultValues?: FormValueType;
  onSubmit: (formValue: FormValueType) => void;
}> = memo(({ nodeId, defaultValues = FETCH_NODE_FORM.DEFAULT_FORM_VALUE, onSubmit }) => {
  const formInstance = useForm<FormValueType>({
    resolver: zodResolver(formSchemas),
    defaultValues,
    mode: "all",
  });

  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    control: formInstance.control,
    name: "items",
  });

  const itemsErrorMessage = formInstance.formState.errors.items?.message;

  useNodeUpdateFormInvalid(nodeId, !formInstance.formState.isValid);

  return (
    <RHF.FormWithZod
      hideDevTool
      instance={formInstance}
      zodSchema={formSchemas}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Description */}
      <RHF.Text
        fullWidth
        name="description"
        label="Description"
        placeholder="4+ characters"
        multiline
        minRows={2}
        maxRows={2}
      />

      {/* Items */}
      {items.map((field, index) => (
        <FetchNodeDetailItemWrapper key={field.id} index={index} removeItem={remove}>
          {/* Item.Method */}
          <RHF.Select
            name={`items.${index}.method`}
            label="Method"
            clearable={false}
            options={FETCH_NODE_FORM.DEFAULT_METHOD_OPTIONS.map(({ value, label }) => ({
              title: label,
              value,
            }))}
          />
          {/* Item.URL */}
          <RHF.Text name={`items.${index}.url`} label="URL" />
        </FetchNodeDetailItemWrapper>
      ))}
      <Button onClick={() => append(FETCH_NODE_FORM.DEFAULT_FORM_VALUE_ITEM)}>Add Item</Button>
      <Typography color="error" variant="caption" sx={{ height: 24, pl: 0.5 }}>
        {itemsErrorMessage}
      </Typography>

      {/* Action Buttons */}
      <RHF.Action isLoading={false} />
    </RHF.FormWithZod>
  );
});

export default FetchNodeDetail;

const FetchNodeDetailItemWrapper: NamedExoticComponent<
  PropsWithChildren<{
    index: number;
    removeItem: (index: number) => void;
  }>
> = memo(({ children, index, removeItem }) => {
  return (
    <Typography component="div" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {children}

      {/* Remove Button */}
      <IconButton
        icon="material-symbols:close"
        onClick={() => removeItem(index)}
        sx={{ transform: "translateY(-14px)" }}
      />
    </Typography>
  );
});
