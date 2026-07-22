import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, Send, X } from "lucide-react";
import ChatMessageContent from "@/components/ChatMessageContent";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getAssistantReply, type ChatTurn } from "@/lib/chatAssistant";
import { sendChatNotification } from "@/lib/chatNotifications";
import {
  ASSISTANT_NAME,
  buildWhatsAppHandoffMessage,
  QUICK_QUESTIONS,
  WELCOME_MESSAGE,
} from "@/lib/companyKnowledge";
import { getWhatsAppUrl } from "@/lib/seo";
import { normalizePathname } from "@/lib/paths";

type ChatMessage = ChatTurn & {
  id: string;
};

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-7 w-7 fill-current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function createMessage(role: ChatTurn["role"], content: string): ChatMessage {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return {
    id,
    role,
    content,
  };
}

function getSessionId(): string {
  if (typeof window === "undefined") {
    return "ssr";
  }

  const key = "win-chat-session";
  const existing = sessionStorage.getItem(key);
  if (existing) {
    return existing;
  }

  const sessionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(key, sessionId);
  return sessionId;
}

const WhatsAppChatWidget = () => {
  const { pathname } = useLocation();
  const normalizedPath = normalizePathname(pathname);
  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  const sessionIdRef = useRef("");
  const pageUrl = typeof window !== "undefined" ? window.location.href : pathname;

  const getSessionIdForChat = () => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = getSessionId();
    }
    return sessionIdRef.current;
  };

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping, scrollToBottom]);

  const openChat = useCallback(async () => {
    setIsOpen(true);

    if (!hasInitialized) {
      setHasInitialized(true);
      setMessages([createMessage("assistant", WELCOME_MESSAGE)]);

      void sendChatNotification("chat_opened", {
        sessionId: getSessionIdForChat(),
        pageUrl,
      });
    }
  }, [hasInitialized, pageUrl]);

  useEffect(() => {
    const handleOpenDaveChat = () => {
      void openChat();
    };

    window.addEventListener("open-dave-chat", handleOpenDaveChat);
    return () => window.removeEventListener("open-dave-chat", handleOpenDaveChat);
  }, [openChat]);

  const sendUserMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) {
      return;
    }

    const userMessage = createMessage("user", trimmed);
    const history = messages.map(({ role, content }) => ({ role, content }));

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await getAssistantReply(
        history.map(({ role, content }) => ({ role, content })),
        trimmed,
        { pathname: normalizedPath },
      );

      const assistantMessage = createMessage("assistant", reply);
      setMessages((current) => [...current, assistantMessage]);

      void sendChatNotification("assistant_reply", {
        sessionId: getSessionIdForChat(),
        pageUrl,
        messageId: assistantMessage.id,
        userMessage: trimmed,
        transcript: [...history, userMessage, assistantMessage].map(({ role, content }) => ({
          role,
          content,
        })),
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleWhatsAppHandoff = () => {
    const transcript = messages.map(({ role, content }) => ({ role, content }));

    void sendChatNotification("whatsapp_handoff", {
      sessionId: getSessionIdForChat(),
      pageUrl,
      transcript,
    });

    const handoffMessage = buildWhatsAppHandoffMessage(transcript);
    window.open(getWhatsAppUrl(handoffMessage), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {isOpen && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Chat mit Dave"
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden border border-border bg-background shadow-2xl",
            "inset-x-3 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] h-[min(32rem,calc(100dvh-8rem))]",
            "md:inset-x-auto md:right-6 md:bottom-6 md:h-[min(34rem,calc(100dvh-3rem))] md:w-[min(100%,24rem)]",
            "rounded-2xl",
          )}
        >
          <header className="flex items-center gap-3 border-b border-border bg-[#25D366] px-4 py-3 text-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{ASSISTANT_NAME}</p>
              <p className="truncate text-xs text-white/85">Antwortet sofort</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15"
              aria-label="Chat schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    message.role === "assistant"
                      ? "mr-auto bg-secondary text-foreground"
                      : "ml-auto bg-primary text-primary-foreground",
                  )}
                >
                  {message.role === "assistant" ? (
                    <ChatMessageContent content={message.content} />
                  ) : (
                    message.content
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="mr-auto max-w-[88%] rounded-2xl bg-secondary px-3 py-2 text-sm text-muted-foreground">
                  Schreibt…
                </div>
              )}

              {messages.length <= 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void sendUserMessage(question)}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <div className="space-y-2 border-t border-border p-3">
            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void sendUserMessage(input);
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ihre Frage…"
                className="h-10 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                disabled={isTyping}
                aria-label="Nachricht eingeben"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full bg-primary"
                disabled={!input.trim() || isTyping}
                aria-label="Nachricht senden"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <Button
              type="button"
              onClick={handleWhatsAppHandoff}
              className="h-10 w-full rounded-full bg-[#25D366] text-white hover:bg-[#20BD5A]"
            >
              <WhatsAppIcon />
              Jetzt per WhatsApp weiter
            </Button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={() => void openChat()}
          aria-label="Chat mit Dave öffnen"
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#20BD5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 right-4 md:right-6 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] md:bottom-6"
        >
          <WhatsAppIcon />
        </button>
      )}
    </>
  );
};

export default WhatsAppChatWidget;
