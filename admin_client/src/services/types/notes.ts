import {
  type AccountDataType as ProtoAccountDataType,
  AccountRoleType as ProtoAccountRoleType,
  type NoteDataType as ProtoNoteDataType,
  SelectableNoteType as ProtoSelectableNoteType,
} from "venomous_app_protobuf/ts/notes";

export { ProtoAccountRoleType as AccountRoleType, ProtoSelectableNoteType as SelectableNoteType };

export type NoteDataType = {
  _id: ProtoNoteDataType["Id"];
  type: ProtoNoteDataType["type"];
  title: ProtoNoteDataType["title"];
  message: ProtoNoteDataType["message"];
  created_at: ProtoNoteDataType["createdAt"];
  updated_at: ProtoNoteDataType["updatedAt"];
  account_id: ProtoNoteDataType["accountId"];
};

export type AccountDataType = {
  _id: ProtoAccountDataType["Id"];
  display_name: ProtoAccountDataType["displayName"];
  password: ProtoAccountDataType["password"];
  email: ProtoAccountDataType["email"];
  avatar: ProtoAccountDataType["avatar"];
  created_at: ProtoAccountDataType["createdAt"];
  updated_at: ProtoAccountDataType["updatedAt"];
  role: ProtoAccountDataType["role"];
  is_active: ProtoAccountDataType["isActive"];
};
