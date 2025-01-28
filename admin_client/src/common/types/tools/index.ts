/* eslint-disable @typescript-eslint/no-explicit-any */

export type Nullable<T> = T | null;

export type NotNullable<T> = T extends null | undefined ? never : T;

// ----------------------------------------------------------------------------------------------------

export type ObjectKeyof<T> = keyof T;

export type ObjectValueOf<T> = T[keyof T];

export type ArrayElementOf<T extends any[]> = T extends (infer U)[] ? U : never;

export type FunctionParamsArrayOf<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

// ----------------------------------------------------------------------------------------------------

export enum SupportedFileTypes {
  JSON = "json",
  CSV = "csv",
  XLSX = "xlsx",
  // PDF = "pdf",
  // YAML = "yaml",
}
