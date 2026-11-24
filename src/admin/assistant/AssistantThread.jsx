import { useEffect, useRef } from "react";
import Icon from "../../components/Icon";
import { ASSISTANT } from "../../content/admin";
import AssistantWelcome from "./AssistantWelcome";
import ChatExchange from "./ChatExchange";

export default function AssistantThread({
  messages,
  loading,
  onSuggestion,
  onEdit,
  onRemove,
}) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <div className="assistant-thread" aria-live="polite">
      {!messages.length && !loading ? <AssistantWelcome onSelect={onSuggestion} /> : null}

      {messages.map((message) => (
        <ChatExchange
          key={message.id}
          question={message.question}
          answer={message.answer}
          busy={loading}
          onEdit={() => onEdit(message.id)}
          onRemove={() => onRemove(message.id)}
          onSuggestion={onSuggestion}
        />
      ))}

      {loading ? (
        <div className="chat-row chat-row--assistant">
          <div className="assistant-mark small" aria-hidden="true">
            <Icon name="assistant" />
          </div>
          <div className="chat-bubble chat-bubble--assistant typing-indicator" role="status">
            <i />
            <i />
            <i />
            <span>{ASSISTANT.typingLabel}</span>
          </div>
        </div>
      ) : null}
      <div ref={endRef} />
    </div>
  );
}
