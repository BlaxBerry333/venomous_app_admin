type CommonNodeFormValueType = {
  description: string;
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WorkflowsFormValue {
  export type CommonItemType<T = string> = {
    label: string;
    value: T;
  };

  // ----------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  /**
   * Message Node
   */
  export interface MessageNode extends CommonNodeFormValueType {
    message: string;
  }

  // ----------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  /**
   * Fetch Node
   */
  export interface FetchNode extends CommonNodeFormValueType {
    items: Array<{
      method: FetchNodeMethod;
      url: string;
    }>;
  }

  export enum FetchNodeMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
  }

  // ----------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  /**
   * Script Node
   */
  export interface ScriptNode extends CommonNodeFormValueType {
    language: string;
    code: string;
  }
}
