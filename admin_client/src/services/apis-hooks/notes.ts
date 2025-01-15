import { useQuery } from "@tanstack/react-query";

import { API_ENTRYPOINTS } from "../entry-points";
import { SERVER_API_INSTANCE } from "../instance";

export function useGetNoteList() {
  const url = API_ENTRYPOINTS.notes.getNoteList();

  const query = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await SERVER_API_INSTANCE.get(url);
      return response.data;
    },
  });

  return { ...query };
}
