import { useState, useEffect } from "react";
import {
  X,
  Share2,
  Copy,
  Check,
  Globe,
  Lock,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { BACKEND_URL, FRONTEND_URL } from "../config";
import { useStateStore } from "../store/stateStore";

interface ShareBrainModalProps {
  onClose: () => void;
}

export default function ShareBrainModal({ onClose }: ShareBrainModalProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const isLoading = useStateStore((state) => state.isLoading);
  const setIsLoading = useStateStore.getState().setIsLoading;
  const ShareBrainStatus = useStateStore((state) => state.ShareBrainStatus);
  const setShareBrainStatus = useStateStore.getState().setIsShareBrainStatus;
  const ShareBrainModelOpen = useStateStore(
    (state) => state.ShareBrainModelOpen
  );
  const ShareBrainHash = useStateStore((state) => state.ShareBrainHash);
  const setShareBrainHash = useStateStore.getState().setShareBrainHash;
  const [error, setError] = useState("");

  // Check current sharing status on mount
  useEffect(() => {
    if (!ShareBrainStatus) {
      checkSharingStatus();
    }
  }, []);

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

  const toggleSharing = async (enabled: boolean) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/brain/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ share: enabled }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update sharing settings");
      }

      if (enabled && data.hash) {
        setShareBrainHash(data.hash);
        setShareLink(`${FRONTEND_URL}/brain/${data.hash}`);
        setIsSharing(true);
      } else {
        setShareBrainHash("");
        setShareLink("");
        setIsSharing(false);
      }
    } catch (err) {
      setError((err as Error)?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const openInNewTab = () => {
    window.open(shareLink, "_blank");
  };

  if (!ShareBrainModelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden animate-slideUp">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative px-6 py-5 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Share2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Share Your Brain
                </h2>
                <p className="text-sm text-gray-400">
                  Let others explore your content collection
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="relative px-6 py-6 space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-3">
              {isSharing ? (
                <Globe className="w-5 h-5 text-green-400" />
              ) : (
                <Lock className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium text-white">
                  {isSharing ? "Brain is Public" : "Brain is Private"}
                </p>
                <p className="text-sm text-gray-400">
                  {isSharing
                    ? "Anyone with the link can view"
                    : "Only you can access"}
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => toggleSharing(!isSharing)}
              disabled={isLoading}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                isSharing ? "bg-purple-600" : "bg-gray-700"
              } ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  isSharing ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-400">Error</p>
                <p className="text-sm text-red-300/80">{error}</p>
              </div>
            </div>
          )}

          {/* Share Link Section */}
          {isSharing && shareLink && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Shareable Link
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 bg-transparent text-gray-300 text-sm outline-none"
                    />
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
                  >
                    {isCopied ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Copy className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    )}
                  </button>
                  <button
                    onClick={openInNewTab}
                    className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </button>
                </div>
                {isCopied && (
                  <p className="text-sm text-green-400 mt-2 animate-fadeIn">
                    ✓ Link copied to clipboard!
                  </p>
                )}
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-blue-400">
                      What gets shared?
                    </p>
                    <ul className="text-sm text-blue-300/80 space-y-1">
                      <li>• All your saved links and content</li>
                      <li>• Your username and email</li>
                      <li>• Content organization (tags, categories)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isSharing && !isLoading && (
            <div className="py-8 text-center animate-fadeIn">
              <div className="inline-flex p-4 bg-gray-800/50 rounded-full mb-4">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400 text-sm">
                Enable sharing to generate a shareable link
              </p>
            </div>
          )}

          {isLoading && (
            <div className="py-8 text-center">
              <div className="inline-flex items-center gap-2 text-purple-400">
                <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Updating sharing settings...</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative px-6 py-4 border-t border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
