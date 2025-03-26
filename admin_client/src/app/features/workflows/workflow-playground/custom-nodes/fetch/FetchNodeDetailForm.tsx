import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { useNodeFormValueValidation } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { Button, IconButton, RHF, Typography, useRHFValueIsEqual } from "~/ui/components";
import { FETCH_NODE_FORM, formSchemas, type FormValueType } from "./_helpers";

export { type FormValueType } from "./_helpers";

const FetchNodeDetailForm: NamedExoticComponent<{
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

  useNodeFormValueValidation({ nodeId, formInstance });

  const { isNothingChanged } = useRHFValueIsEqual({ defaultValues, formInstance });

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
        <FetchNodeDetailFormItemWrapper key={field.id} index={index} removeItem={remove}>
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
        </FetchNodeDetailFormItemWrapper>
      ))}
      <Button onClick={() => append(FETCH_NODE_FORM.DEFAULT_FORM_VALUE_ITEM)}>Add Item</Button>
      <Typography color="error" variant="caption" sx={{ height: 24, pl: 0.5 }}>
        {itemsErrorMessage}
      </Typography>

      {/* Action Buttons */}
      <RHF.Action isLoading={false} disabledSubmit={isNothingChanged} />
    </RHF.FormWithZod>
  );
});

export default FetchNodeDetailForm;

const FetchNodeDetailFormItemWrapper: NamedExoticComponent<
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
