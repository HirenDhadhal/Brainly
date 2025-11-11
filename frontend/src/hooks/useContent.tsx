import axios from "axios";
import { BACKEND_URL } from "../config";
import { useStateStore } from "../store/stateStore";
import { ContentItem } from "../types/types";

export function useContent() {
  const setIsLoading = useStateStore.getState().setIsLoading;
  const setAllNotes = useStateStore.getState().setAllNotes;
  setIsLoading(true);

  async function fetchNotes() {
    try {
      const response = await axios.get<{ content: ContentItem[] }>(
        `${BACKEND_URL}/api/v1/content`,
        {
          withCredentials: true,
        }
      );
      setAllNotes(response.data.content);
    } catch (err: any) {
      console.log(`Error while fetching notes, ${err}`);
    }
    setIsLoading(false);
  }
  return { fetchNotes };
}
