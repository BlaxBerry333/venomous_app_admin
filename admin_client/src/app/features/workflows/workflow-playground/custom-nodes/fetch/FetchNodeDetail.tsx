import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { WorkflowsFormValue } from "~/app/features/workflows/_types";
import { Button, IconButton, RHF, Typography } from "~/ui/components";
import {
  DEFAULT_FORM_VALUE,
  DEFAULT_FORM_VALUE_ITEM,
  DEFAULT_METHOD_OPTIONS,
  formSchemas,
} from "./_helpers";

export type FormValueType = WorkflowsFormValue.FetchNode;

const FetchNodeDetail: NamedExoticComponent<{
  defaultValues?: FormValueType;
  onSubmit: (formValue: FormValueType) => void;
}> = memo(({ defaultValues = DEFAULT_FORM_VALUE, onSubmit }) => {
  const formInstance = useForm<FormValueType>({
    resolver: zodResolver(formSchemas),
    defaultValues,
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control: formInstance.control,
    name: "items",
  });

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

      {fields.map((field, index) => (
        <FetchNodeDetailItemWrapper key={field.id} index={index} removeItem={remove}>
          {/* Item.Method */}
          <RHF.Select
            name={`items.${index}.method`}
            label="Method"
            clearable={false}
            options={DEFAULT_METHOD_OPTIONS.map(({ value, label }) => ({
              title: label,
              value,
            }))}
          />
          {/* Item.URL */}
          <RHF.Text name={`items.${index}.url`} label="URL" />
        </FetchNodeDetailItemWrapper>
      ))}
      <Button sx={{ mb: 2 }} onClick={() => append(DEFAULT_FORM_VALUE_ITEM)}>
        Add Item
      </Button>

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
