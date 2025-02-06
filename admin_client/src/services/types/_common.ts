export type DRFPaginatedResponseType<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type BFFCommonResponseType<T, DataType = undefined> = {
  code: number;
  error: null | string;
  data: null | (DataType extends undefined ? T : DataType);
  message: string;
};
