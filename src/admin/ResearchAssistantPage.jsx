import AdminLayout from "../components/layout/AdminLayout";
import DataScopeNote from "../components/layout/DataScopeNote";
import { ASSISTANT } from "../content/admin";
import { WORKSPACE_SECTIONS } from "../content/site";
import AssistantComposer from "./assistant/AssistantComposer";
import AssistantThread from "./assistant/AssistantThread";
import useResearchAssistant from "./assistant/useResearchAssistant";

export default function ResearchAssistantPage() {
  const {
    health,
    question,
    setQuestion,
    messages,
    loading,
    ask,
    askText,
    clearDraft,
    startOver,
    remove,
    edit,
    stop,
  } = useResearchAssistant();
  const aiReady = Boolean(health?.ai_available);

  const statusLabel = health
    ? aiReady
      ? ASSISTANT.status.ready
      : ASSISTANT.status.snapshot
    : ASSISTANT.status.checking;
  const statusClass = health
    ? aiReady
      ? ASSISTANT.status.availableClass
      : ASSISTANT.status.fallbackClass
    : ASSISTANT.status.checkingClass;

  return (
    <AdminLayout
      active={WORKSPACE_SECTIONS.assistant}
      icon={ASSISTANT.icon}
      title={ASSISTANT.title}
      warning={ASSISTANT.warning}
    >
      <section className="assistant-page" aria-label={ASSISTANT.title}>
        <div className="assistant-shell">
          <div className="assistant-rail">
            <div className={`assistant-status ${statusClass}`}>
              <i />
              <span>
                {statusLabel}
                <small>
                  {aiReady ? ASSISTANT.status.groundedNote : ASSISTANT.status.readOnlyNote}
                </small>
              </span>
            </div>
            {messages.length > 0 ? (
              <button type="button" className="thread-reset" onClick={startOver}>
                {ASSISTANT.actions.startOver}
              </button>
            ) : null}
          </div>

          <AssistantThread
            messages={messages}
            loading={loading}
            onSuggestion={askText}
            onEdit={edit}
            onRemove={remove}
          />

          <AssistantComposer
            question={question}
            loading={loading}
            onQuestionChange={setQuestion}
            onSubmit={ask}
            onStop={stop}
            onClearDraft={clearDraft}
          />
        </div>
      </section>
      <DataScopeNote {...ASSISTANT.scope} />
    </AdminLayout>
  );
}
