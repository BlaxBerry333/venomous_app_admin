import { useQuery } from "@tanstack/react-query";

import { API_ENTRYPOINTS, API_ENTRYPOINTS_NAMES } from "../entry-points";
import { SERVER_API_INSTANCE } from "../instance";

export function useGetNoteList() {
  const query = useQuery({
    queryKey: [API_ENTRYPOINTS_NAMES.notes.getNoteList],
    queryFn: async () => {
      const url = API_ENTRYPOINTS.notes.getNoteList();
      const response = await SERVER_API_INSTANCE.get(url);
      return response.data;
    },
  });

  return { ...query };
}
