import { create } from "zustand";
import { ContentItem, User } from "../types/types";

type StateStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;

  CreateContentModelOpen: boolean;
  setIsCreateContentModelOpen: (open: boolean) => void;

  ShareBrainModelOpen: boolean;
  setIsShareBrainModelOpen: (open: boolean) => void;

  AccountModelOpen: boolean;
  setIsAccountModelOpen: (open: boolean) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  currentCategory: string;
  setCurrentCategory: (category: string) => void;

  contentNote: ContentItem[];
  setContentNote: (note: ContentItem) => void;
  setAllNotes: (notes: ContentItem[]) => void;
};

export const useStateStore = create<StateStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  
  sideBarOpen: true,
  setSideBarOpen: (open) => set({ sideBarOpen: open }),

  CreateContentModelOpen: false,
  setIsCreateContentModelOpen: (open) => set({ CreateContentModelOpen: open}),

  ShareBrainModelOpen: false,
  setIsShareBrainModelOpen: (open) => set({ ShareBrainModelOpen: open}),

  AccountModelOpen: false,
  setIsAccountModelOpen: (open) => set({ AccountModelOpen: open}),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading}),

  currentCategory: "",
  setCurrentCategory: (category) => set({ currentCategory: category}),

  contentNote: [],
  setContentNote: (note) => 
    set((state) => ({ contentNote: [...state.contentNote, note] })),
  setAllNotes: (notes) => set({ contentNote: notes }),
}));
