import axios from "axios";
import { BACKEND_URL } from "../config";
import { useStateStore } from "../store/stateStore";
import { ContentItem } from "../types/types";
import { useEffect } from "react";

export function useContent() {
  const ShareBrainStatus = useStateStore((state) => state.ShareBrainStatus);
  const setIsLoading = useStateStore.getState().setIsLoading;
  const setAllNotes = useStateStore.getState().setAllNotes;
  const setShareBrainStatus = useStateStore.getState().setIsShareBrainStatus;
  const setShareBrainHash = useStateStore.getState().setShareBrainHash;

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ content: ContentItem[] }>(
        `${BACKEND_URL}/api/v1/content`,
        { withCredentials: true }
      );
      setAllNotes(response.data.content);
    } catch (err: any) {
      console.log(`Error while fetching notes, ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const checkSharingStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/brain/share`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setShareBrainStatus(data.sharing);
      setShareBrainHash(data.hash);
    } catch (err: any) {
      console.log(`Error while fetching Brain Sharing Status, ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeContent = async () => {
      setIsLoading(true);
      try {
        await fetchNotes();
        if (!ShareBrainStatus) {
          await checkSharingStatus();
        }
      } catch (err) {
        console.error("Error initializing content:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeContent();
  }, []);

  return { fetchNotes }; // ✅ Return the function
}