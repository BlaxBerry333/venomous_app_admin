import type { z } from "zod";

/**
 * 基于一个现有的 TS 数据类型创建一个 Zod Schema
 *
 * 通过类型推断保持 `z.object()` 创建的数据结构与 API 参数一致，可以避免 API 参数与表单重复定义数据结构，提高代码可读性
 *
 * @example
 * ```ts
 * type APIParamsType = {
 *   username: string;
 *   password: string;
 * };
 *
 * const formSchemas = createZodSchema<APIParamsType>()(
 *   z.object({
 *     username: z.string().min(4, "Username must be at least 4 characters long"),
 *     password: z.string().min(4, "Password must be at least 4 characters long"),
 *   }),
 * );
 * ```
 */
export function createZodSchema<T>() {
  return <SchemaType extends z.ZodType<T>>(schema: SchemaType) => schema;
}
