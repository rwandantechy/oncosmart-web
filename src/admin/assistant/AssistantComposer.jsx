import IconButton from "../../components/ui/IconButton";
import { RESEARCH_QUESTION_MAX_LENGTH } from "../../config/ui";
import { ASSISTANT } from "../../content/admin";

export default function AssistantComposer({
  question,
  loading,
  onQuestionChange,
  onSubmit,
  onStop,
  onClearDraft,
}) {
  function onKeyDown(event) {
    if (event.key === "Escape" && question) {
      event.preventDefault();
      onClearDraft();
    }
  }

  return (
    <form className="assistant-composer" onSubmit={onSubmit}>
      <input
        value={question}
        onChange={(event) => onQuestionChange(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={ASSISTANT.composer.placeholder}
        maxLength={RESEARCH_QUESTION_MAX_LENGTH}
        aria-label={ASSISTANT.composer.fieldLabel}
        disabled={loading}
      />
      {question && !loading ? (
        <IconButton
          className="composer-clear"
          name="close"
          label={ASSISTANT.actions.clearDraft}
          onClick={onClearDraft}
        />
      ) : null}
      {loading ? (
        <IconButton
          className="composer-stop"
          name="stop"
          label={ASSISTANT.actions.stop}
          onClick={onStop}
        />
      ) : (
        <IconButton
          type="submit"
          name="send"
          label={ASSISTANT.composer.sendLabel}
          disabled={!question.trim()}
          className="composer-send"
        />
      )}
      <small>{ASSISTANT.composer.disclaimer}</small>
    </form>
  );
}
