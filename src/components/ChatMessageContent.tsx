const LINK_PATTERN = /(\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<]+[^\s<.,;:!?)])/g;

type ChatMessageContentProps = {
  content: string;
  linkClassName?: string;
};

const ChatMessageContent = ({ content, linkClassName }: ChatMessageContentProps) => {
  const parts = content.split(LINK_PATTERN);

  return (
    <>
      {parts.map((part, index) => {
        const markdownLink = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (markdownLink) {
          return (
            <a
              key={index}
              href={markdownLink[2]}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName ?? "underline font-medium hover:opacity-80"}
            >
              {markdownLink[1]}
            </a>
          );
        }

        if (/^https?:\/\//.test(part)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName ?? "underline break-all hover:opacity-80"}
            >
              {part}
            </a>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default ChatMessageContent;
