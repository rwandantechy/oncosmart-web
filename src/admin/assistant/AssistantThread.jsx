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
  onStartOver,
}) {
  return (
    <div className="assistant-thread">
      {messages.length > 0 && (
        <div className="assistant-toolbar">
          <button type="button" className="thread-reset" onClick={onStartOver}>
            <Icon name="restart" />
            {ASSISTANT.actions.startOver}
          </button>
        </div>
      )}
      {!messages.length && !loading && <AssistantWelcome onSelect={onSuggestion} />}
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
      {loading && (
        <div className="chat-answer">
          <div className="assistant-mark small">
            <Icon name="assistant" />
          </div>
          <div className="typing-indicator" role="status">
            <i />
            <i />
            <i /> <span>{ASSISTANT.typingLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
}
