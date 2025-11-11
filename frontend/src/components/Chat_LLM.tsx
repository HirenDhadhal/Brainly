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
}

const Chat_LLM = () => {
  const sideBarOpen = useStateStore((state) => state.sideBarOpen);
  const setSideBarOpen = useStateStore.getState().setSideBarOpen;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const user = axios
  //     .get(`${BACKEND_URL}/status`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       const newUser = res.data;
  //       const name = res.data.name;
  //       const email = res.data.email;
  //       const image = res.data.image;
  //       const id = res.data.id;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  async function sendMessage() {
    const userInput = inputRef.current?.value?.trim();
    if (!userInput) return;

    setMessages((prev) => [...prev, { role: "user", text: userInput }]);
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

      setMessages((prev) => [...prev, { role: "ai", text: aiText, sources }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error fetching AI response." },
      ]);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="flex">
      <SideBar SidebarOpen={true} setSidebarOpen={setSideBarOpen} />
      <div className="flex flex-col h-[500px] w-full max-w-xl mx-auto bg-white rounded shadow p-4">
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded ${
                msg.role === "user"
                  ? "bg-blue-100 text-right ml-16"
                  : "bg-gray-200 text-left mr-16"
              }`}
            >
              <span className="font-semibold">
                {msg.role === "user" ? "You" : "AI"}:
              </span>{" "}
              {msg.text}
              {/* Show sources if present and this is an AI message */}
              {msg.role === "ai" && msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 text-xs text-gray-600">
                  <div className="font-semibold mb-1">Sources:</div>
                  <ul className="list-disc list-inside">
                    {msg.sources.map((src, i) =>
                      src.link ? (
                        <li key={i}>
                          <a
                            href={src.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-all"
                          >
                            {src.title ? src.title : src.link}
                          </a>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="p-2 rounded bg-gray-200 text-left mr-16 animate-pulse">
              AI is typing...
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <CustomInput
            reference={inputRef}
            placeholder="Type your question..."
            onChange={() => {}}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="primary"
            text="Send"
            onClick={sendMessage}
            fullWidth={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat_LLM;
