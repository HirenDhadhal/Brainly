import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import CustomInput from "./CustomInput";
import SideBar from "./SideBar";
import { useStateStore } from "../store/stateStore";

interface Message {
  role: "user" | "ai";
  text: string;
  sources?: { title?: string; link?: string }[];
  videoLinks?: string[];
}

const Chat_LLM = () => {
  const sideBarOpen = useStateStore((state) => state.sideBarOpen);
  const setSideBarOpen = useStateStore.getState().setSideBarOpen;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Extract YouTube links from text
  const extractYouTubeLinks = (text: string): string[] => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(?:[^\s]*)?/g;
    const matches = text.matchAll(youtubeRegex);
    return Array.from(matches, match => match[0]);
  };

  // Get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      
      if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
      }
      
      if (parsed.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed${parsed.pathname}`;
      }
      
      return null;
    } catch {
      return null;
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  async function sendMessage() {
    const userInput = inputValue.trim();
    if (!userInput) return;

    setMessages((prev) => [...prev, { role: "user", text: userInput }]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/loadembedding`,
        { query: userInput },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const aiText =
        response.data?.response ||
        response.data?.message ||
        "No response from AI.";

      const sources = Array.isArray(response.data?.sources)
        ? response.data.sources
        : [];

      // Extract YouTube links from the response text
      const videoLinks = extractYouTubeLinks(aiText);

      setMessages((prev) => [...prev, { role: "ai", text: aiText, sources, videoLinks }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error fetching AI response." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <SideBar SidebarOpen={sideBarOpen} setSidebarOpen={setSideBarOpen} />
      
      <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold text-gray-800">
            Chat with Your Brain
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ask questions about your saved content
          </p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                AI
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Start a conversation
                </h2>
                <p className="text-gray-500 mt-2 max-w-md">
                  Ask me anything about your saved links, notes, and content.
                  I'll help you find what you need.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-4 animate-slide-up ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600"
                    : "bg-gradient-to-br from-purple-500 to-purple-600"
                }`}
              >
                {msg.role === "user" ? "U" : "AI"}
              </div>

              {/* Message Content */}
              <div
                className={`flex-1 max-w-3xl ${
                  msg.role === "user" ? "items-end" : "items-start"
                } flex flex-col`}
              >
                <div
                  className={`rounded-2xl px-5 py-3 shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-sm"
                      : "bg-white text-gray-800 rounded-tl-sm border border-gray-200"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>

                  {/* YouTube Video Embeds */}
                  {msg.role === "ai" && msg.videoLinks && msg.videoLinks.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {msg.videoLinks.map((link, i) => {
                        const embedUrl = getYouTubeEmbedUrl(link);
                        return embedUrl ? (
                          <div key={i} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                            <iframe
                              className="w-full aspect-video"
                              src={embedUrl}
                              title={`Video ${i + 1}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  {/* Sources */}
                  {msg.role === "ai" &&
                    msg.sources &&
                    msg.sources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                          Sources
                        </div>
                        <div className="space-y-2">
                          {msg.sources.map((src, i) =>
                            src.link ? (
                              <a
                                key={i}
                                href={src.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 hover:underline p-2 rounded-lg hover:bg-blue-50 transition-colors"
                              >
                                <svg
                                  className="w-3 h-3 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                                <span className="truncate">
                                  {src.title || src.link}
                                </span>
                              </a>
                            ) : null
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-4 animate-slide-up">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                AI
              </div>
              <div className="flex-1 max-w-3xl">
                <div className="rounded-2xl rounded-tl-sm px-5 py-3 bg-white border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                    </div>
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-white border-2 border-gray-300 rounded-2xl shadow-sm focus-within:border-blue-500 focus-within:shadow-md transition-all">
              <textarea
                ref={textareaRef}
                className="flex-1 resize-none px-4 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-400 max-h-32 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                placeholder="Ask a question about your content..."
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || loading}
                className="flex-shrink-0 m-2 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors shadow-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Chat_LLM;