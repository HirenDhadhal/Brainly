import { BACKEND_URL } from "../config";
import { BrainIcon } from "../icons/BrainIcon";
import TwitterIcon from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { useStateStore } from "../store/stateStore";
import SidebarItem from "./SidebarItem";
import { Menu, X } from "lucide-react";

interface SideBarProps {
  SidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ SidebarOpen, setSidebarOpen }) => {
  const setCurrentUser = useStateStore.getState().setCurrentUser;

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCurrentUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error("Logout error:", error);
      setCurrentUser(null);
      window.location.href = '/';
    }
  };

  if (!SidebarOpen) {
    return (
      <>
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-br from-purple-600/90 to-indigo-600/90 backdrop-blur-xl rounded-xl border border-purple-500/20 text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 group"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={() => setSidebarOpen(false)}
      />

      <div className="fixed top-0 left-0 h-screen w-72 bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-xl border-r border-purple-500/20 z-50 shadow-2xl animate-slideInLeft">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
          <div
            className="absolute w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse bottom-0 right-0 translate-x-1/2 translate-y-1/2"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col">
          <div className="pt-6 px-6 pb-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center text-2xl font-bold group cursor-pointer">
                <div className="mr-3 text-purple-400 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <BrainIcon />
                </div>
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Brainly
                </span>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-purple-500/20 rounded-lg transition-all duration-300 text-gray-400 hover:text-white group"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>

          <div className="flex-1 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Content Types
              </div>
              <SidebarItem text="Twitter" Icon={<TwitterIcon />} />
              <SidebarItem text="Youtube" Icon={<YoutubeIcon />} />
            </div>
          </div>

          <div className="p-4 border-t border-purple-500/20">
            <button
              onClick={() => {
                handleLogout();
                console.log("Logout clicked");
              }}
              className="w-full p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                  <span className="text-sm font-medium text-red-400 group-hover:text-red-300 transition-colors">
                    Logout
                  </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }

        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </>
  );
};

export default SideBar;
