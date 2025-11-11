import ShareIcon from "../icons/ShareIcon";

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

const Card = ({ title, link, type }: CardProps) => {
  return (
    <div>
      <div className="border border-gray-200 max-w-72 p-4 bg-white rounded-xl">
        <div className="flex justify-between ">
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            <div className="text-gray-500">
              <ShareIcon />
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" &&
            (() => {
              const embedUrl = getYouTubeEmbedUrl(link);
              return embedUrl ? (
                <iframe
                  className="w-full aspect-video rounded-xl"
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
            <blockquote className="twitter-tweet max-h-32">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
