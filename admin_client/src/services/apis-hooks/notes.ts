import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { AxiosError } from "axios";

import { API_ENTRYPOINTS } from "../entry-points";
import { BFF_API_INSTANCE } from "../instance";
import type { BFFCommonResponseType } from "../types/_common";
import type {
  CreateNoteResponseType,
  DeleteNoteResponseType,
  GetNoteDataResponseType,
  GetNoteListResponseType,
  NoteDataType,
  UpdateNoteResponseType,
} from "../types/notes";

export function useGetNoteList() {
  const url = API_ENTRYPOINTS.notes.getNoteList();

  const query = useQuery<GetNoteListResponseType, AxiosError<BFFCommonResponseType<null>>>({
    queryKey: [url, "list"],
    queryFn: async () => {
      const response = await BFF_API_INSTANCE.get(url);
      return response.data;
    },
  });

  return { ...query };
}

export function useGetNoteDetail(id: string) {
  const url = API_ENTRYPOINTS.notes.getNoteDetail(id);

  const query = useQuery<GetNoteDataResponseType, AxiosError<BFFCommonResponseType<null>>>({
    queryKey: [url, "detail"],
    queryFn: async () => {
      const response = await BFF_API_INSTANCE.get(url);
      return response.data;
    },
  });

  return { ...query };
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  const url = API_ENTRYPOINTS.notes.postNoteDetail();

  const mutate = useMutation<
    CreateNoteResponseType,
    AxiosError<BFFCommonResponseType<null>>,
    Omit<NoteDataType, "_id">
  >({
    mutationKey: [url, "create"],
    mutationFn: async (data) => {
      const response = await BFF_API_INSTANCE.post(url, data);
      return response.data;
    },
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      queryClient.invalidateQueries({
        queryKey: [API_ENTRYPOINTS.notes.getNoteList(), "list"],
      });
    },
  });

  return { ...mutate };
}

export function useUpdateNote(id: string) {
  const queryClient = useQueryClient();

  const url = API_ENTRYPOINTS.notes.putNoteDetail(id);

  const mutate = useMutation<
    UpdateNoteResponseType,
    AxiosError<BFFCommonResponseType<null>>,
    Partial<NoteDataType>
  >({
    mutationKey: [url, "update"],
    mutationFn: async (data) => {
      const response = await BFF_API_INSTANCE.put(url, data);
      return response.data;
    },
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      queryClient.invalidateQueries({
        queryKey: [API_ENTRYPOINTS.notes.getNoteList(), "list"],
      });
    },
  });

  return { ...mutate };
}

export function useDeleteNote(id: string) {
  const queryClient = useQueryClient();

  const url = API_ENTRYPOINTS.notes.deleteDetail(id);

  const mutate = useMutation<DeleteNoteResponseType, AxiosError, never>({
    mutationKey: [url, "delete"],
    mutationFn: async () => {
      const response = await BFF_API_INSTANCE.delete(url);
      return response.data;
    },
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      queryClient.invalidateQueries({
        queryKey: [API_ENTRYPOINTS.notes.getNoteList(), "list"],
      });
    },
  });

  return { ...mutate };
}

export function useLoginNoteApp() {
  const url = API_ENTRYPOINTS.notes.postLoginAccount();

  const mutate = useMutation<
    BFFCommonResponseType<{ message: string; token: string }>,
    AxiosError<BFFCommonResponseType<null>>,
    { email: string; password: string }
  >({
    mutationKey: [url, "login"],
    mutationFn: async (data) => {
      const response = await BFF_API_INSTANCE.post(url, data);
      return response.data;
    },
  });

  return { ...mutate };
}
