import { useEffect, useState } from "react";
import "../App.css";
import Button from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import SideBar from "../components/SideBar";
import PlusIcon from "../icons/PlusIcon";
import { useContent } from "../hooks/useContent";
import { useStateStore } from "../store/stateStore";
import { ContentItem } from "../types/types";
import { NoNotes } from "../components/NoNotes";
import ShareBrainModal from "../components/ShareBrain";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const isLoading = useStateStore((state) => state.isLoading);
  const currentUser = useStateStore((state) => state.currentUser);
  const currentCategory = useStateStore((state) => state.currentCategory);
  const contentNote = useStateStore((state) => state.contentNote);
  const setShareBrainModelOpen =
    useStateStore.getState().setIsShareBrainModelOpen;
  const setSideBarOpen = useStateStore.getState().setSideBarOpen;

  const { fetchNotes } = useContent();

  useEffect(() => {
    fetchNotes();
  }, []);

  const filterNotes = (
    currentCategory: string,
    contents: Array<ContentItem>
  ) => {
    switch (currentCategory) {
      case "linkedin":
        return contents.filter((content) => content.type[0] === "Linkedin");
      case "youtube":
        return contents.filter((content) => content.type[0] === "Youtube");
      case "twitter":
        return contents.filter((content) => content.type[0] === "X");
      case "document":
        return contents.filter((content) => content.type[0] === "Document");
      case "link":
        return contents.filter((content) => content.type[0] === "Links");
      default:
        return contents;
    }
  };

  const filteredNotes = filterNotes(currentCategory, contentNote);

  return (
    <div className="flex">
      <SideBar SidebarOpen={true} setSidebarOpen={setSideBarOpen} />
      <div className="p-4 ml-64 min-h-screen w-full bg-gray-300">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <ShareBrainModal onClose={() => setShareBrainModelOpen(false)} />

        <div className="flex items-center justify-end gap-4">
          <Button
            variant="secondary"
            text="Add Content"
            onClick={() => {
              setModalOpen(true);
            }}
            StartIcon={<PlusIcon />}
          />
          <Button
            variant="primary"
            text="Share Brain"
            onClick={() => {
              setShareBrainModelOpen(true);
            }}
            StartIcon={<PlusIcon />}
          />
        </div>
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center lg:ml-60">
            <div className="bg-white p-6 rounded-2xl flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-300"></div>
              </div>
              <span className="text-gray-700 text-lg font-medium">
                Loading Brain...
              </span>
            </div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex justify-center items-center mt-40">
            <NoNotes />
          </div>
        ) : (
          <div className="flex flex-wrap 2xl:gap-14 gap-6 mt-10 lg:mb-10 justify-center items-center sm:mx-14 mb-28 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-300 scrollbar-none sm:scrollbar-thin pt-3 px-2">
            {filteredNotes?.map((note: ContentItem) => (
              <Card
                key={note._id}
                link={note.link}
                type={note.type}
                title={note.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
