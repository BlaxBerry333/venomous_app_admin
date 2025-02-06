import type {
  AccountDataType as ProtoAccountDataType,
  NoteDataType as ProtoNoteDataType,
} from "venomous_app_protobuf/ts/notes";
import type { BFFCommonResponseType } from "./_common";

export type GetNoteListResponseType = BFFCommonResponseType<{
  totalCount: number;
  totalPages: number;
  currentPage: number;
  notes: Array<NoteDataType>;
}>;

export type GetNoteDataResponseType = BFFCommonResponseType<{
  note: NoteDataType;
  message: string;
}>;

export type CreateNoteResponseType = BFFCommonResponseType<{
  note: NoteDataType;
  message: string;
}>;

export type UpdateNoteResponseType = BFFCommonResponseType<{
  note: NoteDataType;
  message: string;
}>;

export type DeleteNoteResponseType = BFFCommonResponseType<{
  note: NoteDataType;
  message: string;
}>;

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

export enum SelectableNoteType {
  RAFT = "RAFT",
  ALL = "ALL",
}

export type NoteDataType = {
  _id: ProtoNoteDataType["Id"];
  type: SelectableNoteType;
  title: ProtoNoteDataType["title"];
  message: ProtoNoteDataType["message"];
  created_at: ProtoNoteDataType["createdAt"];
  updated_at: ProtoNoteDataType["updatedAt"];
  account_id: ProtoNoteDataType["accountId"];
};

export enum AccountRoleType {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export type AccountDataType = {
  _id: ProtoAccountDataType["Id"];
  display_name: ProtoAccountDataType["displayName"];
  password: ProtoAccountDataType["password"];
  email: ProtoAccountDataType["email"];
  avatar: ProtoAccountDataType["avatar"];
  created_at: ProtoAccountDataType["createdAt"];
  updated_at: ProtoAccountDataType["updatedAt"];
  role: AccountRoleType;
  is_active: ProtoAccountDataType["isActive"];
};
