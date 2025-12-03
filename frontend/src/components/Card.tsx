import ShareIcon from "../icons/ShareIcon";
import { ExternalLink } from "../icons/ExternalLink";

interface CardProps {
  title: string;
  link: string;
  type: string;
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    // Case 1: Standard YouTube link
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.searchParams.get("v")
    ) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }

    // Case 2: Short youtu.be link
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }

    return null;
  } catch {
    return null;
  }
}

const truncateText = (text: string, maxLength: number) => {
  const trimmedText = text.trim();

  if (trimmedText.length <= maxLength) {
    return trimmedText;
  }

  const truncated = trimmedText.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  const finalTruncated = lastSpaceIndex > 0
    ? truncated.slice(0, lastSpaceIndex)
    : truncated;

  return `${finalTruncated}...`;
}

const Card = ({ title, link, type }: CardProps) => {
  return (
    <div className="border border-gray-300 bg-white w-96 h-[28rem] rounded-xl flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between px-3 py-2 bg-blue-50 rounded-t-xl flex-shrink-0">
        <div className="flex gap-2 items-center text-gray-700">
          <div className="text-blue-600">
            <ShareIcon />
          </div>
          {truncateText(title, 25)}
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-gray-500 hover:text-blue-600 hover:cursor-pointer hover:bg-blue-100 rounded-full p-2">
            <ShareIcon />
          </div>
        </div>
      </div>

      {/* Embed Content Section */}
      <div className="px-2 py-2 flex-1 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full">
          {type === "youtube" &&
            (() => {
              const embedUrl = getYouTubeEmbedUrl(link);
              return embedUrl ? (
                <iframe
                  className="w-full h-full rounded-lg"
                  src={embedUrl}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-sm text-red-500">Invalid YouTube link</p>
              );
            })()}
          {type === "twitter" && (
            <div className="w-full h-full overflow-auto">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}
        </div>
      </div>

      {/* Footer Divider */}
      <div className="border-b border-gray-200 flex-shrink-0"></div>
      
      {/* View Original Button */}
      <div className="flex justify-center items-center py-3 flex-shrink-0">
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex gap-2 items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ExternalLink />
          View Original
        </a>
      </div>
    </div>
  );
};

export default Card;