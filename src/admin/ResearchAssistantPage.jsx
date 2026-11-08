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
      <section className="assistant-page">
        <div className="assistant-hero">
          <div>
            <h2>{ASSISTANT.hero.heading}</h2>
            <p>{ASSISTANT.hero.intro}</p>
          </div>
          <div className={`assistant-status ${statusClass}`}>
            <i />
            {statusLabel}
            <small>
              {aiReady ? ASSISTANT.status.groundedNote : ASSISTANT.status.readOnlyNote}
            </small>
          </div>
        </div>
        <div className="assistant-panel">
          <AssistantThread
            messages={messages}
            loading={loading}
            onSuggestion={askText}
            onEdit={edit}
            onRemove={remove}
            onStartOver={startOver}
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
