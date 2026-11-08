import Icon from "../../components/Icon";
import Avatar from "../../components/layout/Avatar";
import IconButton from "../../components/ui/IconButton";
import { ASSISTANT } from "../../content/admin";
import { ANSWER_PROVIDERS } from "../../services/apiContract";
import AnswerCopy from "./AnswerCopy";

export default function ChatExchange({ question, answer, busy, onEdit, onRemove, onSuggestion }) {
  return (
    <div className="chat-exchange">
      <div className="chat-question">
        <Avatar />
        <p>{question}</p>
        <div className="chat-actions">
          <IconButton
            name="edit"
            label={ASSISTANT.actions.edit}
            onClick={onEdit}
            disabled={busy}
            showLabel
          />
          <IconButton
            name="trash"
            className="icon-action danger"
            label={ASSISTANT.actions.remove}
            onClick={onRemove}
            disabled={busy}
            showLabel
          />
        </div>
      </div>
      <div className="chat-answer">
        <div className="assistant-mark small">
          <Icon name="assistant" />
        </div>
        <div className="chat-answer-body">
          <div className="answer-heading">
            <strong>{ASSISTANT.answer.fromNotices}</strong>
            <span>{ASSISTANT.answer.groundedNote}</span>
          </div>
          <AnswerCopy text={answer.answer} />
          {answer.evidence_used?.length > 0 && (
            <div className="answer-meta">
              <b>{ASSISTANT.answer.evidenceLabel}</b>
              <ul className="answer-meta-list">
                {answer.evidence_used.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {answer.limitations?.length > 0 && (
            <div className="answer-meta">
              <b>{ASSISTANT.answer.limitationsLabel}</b>
              <ul className="answer-meta-list">
                {answer.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {answer.provider === ANSWER_PROVIDERS.unavailable && (
            <div className="answer-help">
              <strong>{ASSISTANT.answer.helpHeading}</strong>
              <div>
                {ASSISTANT.fallbackSuggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => onSuggestion(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
